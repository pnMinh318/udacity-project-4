import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateTodo } from '../../helpers/todos'
import { UpdateTodoRequest, UpdateTodoResponse } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'
import { logger } from '../../helpers/todosAcess'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId: string = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  try {
    logger.info('Updating todo')
    const res = await updateTodo(todoId, updatedTodo)
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (error) {
    console.log('🚀 ~ file: updateTodo.ts:26 ~ error:', error)
    return { statusCode: 500, body: 'Something went wrong when updating' }
  }
})
handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
