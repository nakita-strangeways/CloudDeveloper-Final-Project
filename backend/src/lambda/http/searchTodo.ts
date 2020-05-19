import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import * as middy from 'middy'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import {searchToDo} from '../../businessLogic/toDos'
import {getUserId} from '../utils'

const logger = createLogger('SearchTodosFunction')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // i dont think its getting here...
  logger.info('Search Todos', { event });
  const userId = getUserId(event)
  const query = event.queryStringParameters.query

  logger.info(query);
  const items = await searchToDo(query, userId)
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      items
    })
  }
})
