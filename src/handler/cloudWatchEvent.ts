import 'dotenv/config';
import type { ScheduledEvent } from 'aws-lambda';
import logger from '../util/logger';

// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (event: ScheduledEvent): Promise<Record<string, number|string>> => {
  logger.info('Cloudwatch event successfully triggered!');

  return {
    statusCode: 200,
    body: `Cloudwatch event ${event.id} successfully triggered!`,
  };
};
