import 'dotenv/config';
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import logger from '../util/logger';

/**
 * Lambda Handler
 *
 * @param {APIGatewayProxyEvent} event
 * @param {Context} context
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const queryParams: Record<string, string> = event.queryStringParameters;

  logger.info(queryParams);

  return Promise.resolve({
    statusCode: 200,
    body: JSON.stringify({ queryParams }),
  });
};
