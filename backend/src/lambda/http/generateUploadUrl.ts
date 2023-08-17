import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { genPresignedUrl } from '../../helpers/attachmentUtils'
import { getUserId } from '../utils'
import { addImgUrl } from '../../helpers/todos'
import { logger } from '../../helpers/todosAcess'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const todoId = event.pathParameters.todoId
    const userId = getUserId(event);
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    
    const presignedUrl = genPresignedUrl(todoId, userId)
    logger.info(`Generated URL ${presignedUrl}`);
    
    await addImgUrl(userId,todoId,presignedUrl);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: presignedUrl
      })
    }
  } catch (error) {
    logger.error("Error while generate upload url" + error);
    return {
      statusCode: 500,
      body: "Internal Error"
    }    
  }
})

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
