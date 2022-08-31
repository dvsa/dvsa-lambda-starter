import type {
  APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayEventRequestContext,
} from 'aws-lambda';
import { v4 } from 'uuid';
import { handler } from '../../src/handler/get';

jest.mock('../../src/util/logger.ts');

describe('Test Get Lambda Function', () => {
  test('should return 200 with the query parameters', async () => {
    const queryStringParameters: Record<string, string> = { message: 'Hello world!' };
    const requestContext: APIGatewayEventRequestContext = <APIGatewayEventRequestContext> { requestId: v4() };
    const headers: Record<string, string> = {};
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      queryStringParameters,
      requestContext,
      headers,
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(JSON.stringify({ queryParams: queryStringParameters }));
  });
});
