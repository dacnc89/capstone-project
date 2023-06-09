import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('gettodos.ts')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    logger.info('inside create Todo event')

    const user = getUserId(event)
    const newItem = await createTodo(newTodo, user)

    return {
      statusCode: 201,
      body: JSON.stringify({ item: { ...newItem }})
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
