import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import { TodosAccess } from '../../dataLayer/todosAccess'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  const todosAccess = new TodosAccess()
  const url = await todosAccess.generateUploadUrl(todoId)

  return {
    statusCode: 200,
    body: JSON.stringify({
      uploadUrl: url
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)
