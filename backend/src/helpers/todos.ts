import { TodosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

// TODO: Implement businessLogic

export const createTodo = async <T>(todo: CreateTodoRequest): Promise<T> => {
    try {
    } catch (error) {
        return 0;
    }
    return 1
}

export const deleteTodo = async (todoId: string) : Promise<T> => {
    try {
        const res = await 
    } catch (error) {
        return undefined;
    }
    return true;
}

export const getTodosForUser = async (userToken: string): Promise<Array<TodoItem>> =>{
    return []
}

export const updateTodo =  async (id, todo: UpdateTodoRequest): Promise<TodoItem> =>{
    return null;
}