import type { ScheduledEvent } from 'aws-lambda';
import { v4 } from 'uuid';
import { handler } from '../../src/handler/cloudWatchEvent';

jest.mock('../../src/util/logger.ts');

describe('Test CloudWatch Event Lambda Function', () => {
  test('should return 200 with a success message', async () => {
    const id = v4();
    const eventMock: ScheduledEvent = <ScheduledEvent> { id };

    const res: Record<string, string | number> = await handler(eventMock);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(`Cloudwatch event ${id} successfully triggered!`);
  });
});
