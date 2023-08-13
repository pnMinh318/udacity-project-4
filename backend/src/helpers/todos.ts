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
        return 0 as T;
    }
    return 1 as T
}

export const deleteTodo = async <T>(todoId: string) : Promise<T> => {
    try {
        const res = await 
    } catch (error) {
        return undefined as T;
    }
    return true as T;
}

export const getTodosForUser = async (userToken: string): Promise<Array<TodoItem>> =>{
    return []
}

export const updateTodo =  async <T>(id, todo: UpdateTodoRequest): Promise<T> =>{
    return {

    } as T;
}