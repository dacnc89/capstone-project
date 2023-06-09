import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getAllTodos as getTodosForUser } from '../../businessLogic/todos'
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('gettodos.ts')



export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const user = getUserId(event)
    const todos = await getTodosForUser(user)
    logger.info('In function: getAllTodos()', user)


    return {
      statusCode: 200,
      body: JSON.stringify(todos),
    }
  }
)


handler.use(
  cors({
    credentials: true
  })
)
