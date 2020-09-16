import type { Context, ScheduledEvent } from 'aws-lambda';
import { createLogger, Logger } from '../util/logger';

/**
 * Lambda Handler
 *
 * @param {ScheduledEvent} event
 * @param {Context} context
 * @returns {Promise<Record<string, unknown>>}
 */
export const handler = async (event: ScheduledEvent, context: Context): Promise<Record<string, unknown>> => {
  const logger: Logger = createLogger(null, context);

  logger.info('Cloudwatch event successfully triggered!');

  return Promise.resolve({
    statusCode: 200,
    body: 'Cloudwatch event successfully triggered!',
  });
};
