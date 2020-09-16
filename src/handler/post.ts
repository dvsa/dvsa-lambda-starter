import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createLogger, Logger } from '../util/logger';

/**
 * Lambda Handler
 *
 * @param {APIGatewayProxyEvent} event
 * @param {Context} context
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const logger: Logger = createLogger(event, context);
  const body: Record<string, unknown> = <Record<string, unknown>> JSON.parse(event.body);

  logger.info(JSON.stringify({ body }));

  return Promise.resolve({
    statusCode: 201,
    body: JSON.stringify({ body }),
  });
};
