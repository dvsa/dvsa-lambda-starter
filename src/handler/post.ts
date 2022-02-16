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
  const body: Record<string, unknown> = <Record<string, unknown>> JSON.parse(event.body);

  logger.info(body);

  return Promise.resolve({
    statusCode: 201,
    body: JSON.stringify({ body }),
  });
};
