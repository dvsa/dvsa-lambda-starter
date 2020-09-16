import type { Context, ScheduledEvent } from 'aws-lambda';
import { v4 } from 'uuid';
import { handler } from '../../src/handler/cloudWatchEvent';

describe('Test CloudWatch Event Lambda Function', () => {
  test('should return 200 with a success message', async () => {
    const eventMock: ScheduledEvent = <ScheduledEvent> { };
    const contextMock: Context = <Context> { awsRequestId: v4() };

    const res: Record<string, unknown> = await handler(eventMock, contextMock);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual('Cloudwatch event successfully triggered!');
  });
});
