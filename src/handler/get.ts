import 'dotenv/config';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import logger from '../util/logger';

// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.queryStringParameters) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing query string parameters',
      }),
    };
  }

  const queryParams = event.queryStringParameters;

  logger.info(queryParams);

  return {
    statusCode: 200,
    body: JSON.stringify({ queryParams }),
  };
};
