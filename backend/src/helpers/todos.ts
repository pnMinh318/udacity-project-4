import { DynamoDB } from 'aws-sdk'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as uuid from 'uuid'
import { DeleteItemInput, PutItemInput, QueryInput, UpdateItemInput } from 'aws-sdk/clients/dynamodb'

// TODO: Implement businessLogic

const ddbClient = new DynamoDB.DocumentClient({ region: 'us-east-1' })
const TODO_TABLE = process.env.TODOS_TABLE || "Todos"

export const createTodo = async (userId: string,todo: CreateTodoRequest): Promise<void> => {
  const todoId = uuid.v4() as string
  const createInput: PutItemInput = {
    TableName: TODO_TABLE,
    Item: {
      userId: {
        S: userId
      },
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
    },
    ReturnValues: "ALL_NEW"
  }
  return ddbClient.put(createInput).send()
}

export const deleteTodo = async (userId,todoId: string): Promise<void> => {
  const deleteInput: DeleteItemInput = {
    TableName: TODO_TABLE,
    Key: {
      userId: {S: userId},
      todoId: { S: todoId }
    }
  }
  return ddbClient.delete(deleteInput).send()
}

export const getTodosForUser = async (userId: string): Promise<Array<TodoItem>> => {
  const todoQuery: QueryInput = {
    TableName: TODO_TABLE,
    KeyConditionExpression: `userId =${userId}`
  }
  ddbClient.query(todoQuery)
  return []
}

export const updateTodo = async (userId: string,todoId : string, todo: UpdateTodoRequest): Promise<void> => {
  const updateItem: UpdateItemInput = {
    TableName: TODO_TABLE,
    Key: {
      userId: {
        S: userId,
      },
      todoId: {
        S: todoId
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

export const addImgUrl = async (userId: string,todoId: string,url : string): Promise<void>=>{
  const updateItem: UpdateItemInput = {
    TableName: TODO_TABLE,
    Key: {
      userId: {
        S: userId
      },
      todoId: {
        S: todoId
      }
    },
    UpdateExpression: 'set attachmentUrl=:attachmentUrl',
    ReturnValues: 'ALL_NEW',
    ExpressionAttributeValues: {
      ':attachmentUrl': { S: url },
    }
  }
  return ddbClient.update(updateItem).send()
}