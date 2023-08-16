// import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils'
import { DynamoDB } from 'aws-sdk'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'
import { DeleteItemInput, PutItemInput, QueryInput, UpdateItemInput } from 'aws-sdk/clients/dynamodb'
// import { XAWS } from './todosAcess'

// TODO: Implement businessLogic

const ddbClient = new DynamoDB.DocumentClient({ region: 'us-east-1' })
const TODO_TABLE = 'Todos'

export const createTodo = async (todo: CreateTodoRequest): Promise<void> => {
  const todoId = uuid.v4() as string
  const createInput: PutItemInput = {
    TableName: TODO_TABLE,
    Item: {
      todoId: {
        S: todoId
      },
      name: {
        S: todo.name
      },
      dueDate: {
        S: todo.dueDate
      },
      createdAt: {
        S: todo.createdAt
      },
      done: {
        BOOL: false
      }
    }
  }
  return ddbClient.put(createInput).send()
}

export const deleteTodo = async (todoId: string): Promise<void> => {
  const deleteInput: DeleteItemInput = {
    TableName: TODO_TABLE,
    Key: {
      id: { S: todoId }
    }
  }
  return ddbClient.delete(deleteInput).send()
}

export const getTodosForUser = async (userId: string): Promise<Array<TodoItem>> => {
  const todoQuery: QueryInput = {
    TableName: TODO_TABLE
  }
  ddbClient.query(todoQuery)
  return []
}

export const updateTodo = async (id, todo: UpdateTodoRequest): Promise<void> => {
  const updateItem: UpdateItemInput = {
    TableName: TODO_TABLE,
    Key: {
      todoId: {
        S: id
      }
    },
    UpdateExpression: 'set name=:name, dueDate=:dueDate, done=:done',
    ReturnValues: 'ALL_NEW',
    ExpressionAttributeValues: {
      ':name': { S: todo.name },
      ':done': { BOOL: todo.done },
      ':dueDate': { S: todo.dueDate }
    }
  }
  return ddbClient.update(updateItem).send()
}
