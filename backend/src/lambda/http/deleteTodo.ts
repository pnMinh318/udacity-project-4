import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../helpers/todos'
import { getUserId } from '../utils'
import { logger } from '../../helpers/todosAcess'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    logger.info('Deleting todo', todoId)
    await deleteTodo(todoId)
    return {
      statusCode: 204,
      body: null
    }
  } catch (error) {
    logger.error('Internal error: ')
    return {
      statusCode: 500,
      body: 'Something went wrong when deleting!'
    }
  }
})

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
