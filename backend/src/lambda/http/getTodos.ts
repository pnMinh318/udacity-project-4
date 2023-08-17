import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { getTodosForUser as getTodosForUser } from '../../helpers/todos'
// import { getUserId } from '../utils'
import { logger } from '../../helpers/todosAcess'

// TODO: Get all TODO items for a current user
export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Write your code here
  try {
    const userId = event.headers.authorization
    logger.info('Getting user todo')
    const todos = await getTodosForUser(userId)
    return {
      statusCode: 200,
      body: JSON.stringify(todos)
    }
  } catch (error) {
    logger.error('Error while getting todo'+error)
    return { statusCode: 500, body: 'Internal Error' }
  }
})
handler
  .use(
    cors({
      credentials: true
    })
  )
  .use(httpErrorHandler())
