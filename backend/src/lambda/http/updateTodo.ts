import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'
import { updateTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('getTodos')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  logger.info('Processing event: ', event)

  try {
    await updateTodo(getUserId(event), todoId, updatedTodo)

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
