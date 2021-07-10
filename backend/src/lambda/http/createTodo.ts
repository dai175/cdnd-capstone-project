import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createLogger } from '../../utils/logger'
import { createTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

const logger = createLogger('createTodo')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  logger.info('Processing event: ', event)

  try {
    const createdTodoItem = await createTodo(newTodo, getUserId(event))

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: createdTodoItem
      })
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
