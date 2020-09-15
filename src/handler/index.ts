import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createLogger, Logger } from '../util/logger';

/**
 * Lambda Handler
 *
 * @param {APIGatewayProxyEvent} event
 * @returns {Promise<APIGatewayProxyResult>}
 */
export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const logger: Logger = createLogger(event, context);
  const queries = JSON.stringify(event.queryStringParameters);

  logger.info(`The following queries were found: ${queries}`);

  return Promise.resolve({
    statusCode: 200,
    body: `Queries: ${queries}`,
  });
};
