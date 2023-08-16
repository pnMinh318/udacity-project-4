import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { CreateTodoRequest, CreateTodoResponse } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils'
import { createTodo } from '../../helpers/todos'
import { logger } from '../../helpers/todosAcess'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    logger.info('Creating todo')
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
    const createdTodo = await createTodo(newTodo)

    return { statusCode: 201, body: JSON.stringify(createdTodo) }
  } catch (error) {
    logger.error('Internal error')
    return { statusCode: 201, body: 'Something went wrong when creating' }
  }
})

handler
  .use(
    cors({
      credentials: true
    })
  )
  .use(httpErrorHandler())
