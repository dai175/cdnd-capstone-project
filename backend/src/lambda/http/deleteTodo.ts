import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { deleteTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('deleteTodo')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by id
  logger.info('Processing event: ', event)

  try {
    await deleteTodo(getUserId(event), todoId)

    return {
      statusCode: 204,
      body: null
    }
  } catch (e) {
    logger.error(e)

    return {
      statusCode: 500,
      body: e
    }
  }
})

handler.use(
  cors({
    credentials: true
  })
)