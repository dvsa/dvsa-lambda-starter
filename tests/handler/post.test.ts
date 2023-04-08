import type {
  APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayEventRequestContext,
} from 'aws-lambda';
import { v4 } from 'uuid';
import { handler } from '../../src/handler/post';

jest.mock('../../src/util/logger.ts');

describe('Test Post Lambda Function', () => {
  test('should return 201 with the body', async () => {
    const body: Record<string, string> = { message: 'Hello world!' };
    const requestContext: APIGatewayEventRequestContext = <APIGatewayEventRequestContext> { requestId: v4() };
    const headers: Record<string, string> = {};
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      body: JSON.stringify(body),
      requestContext,
      headers,
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(JSON.stringify({ body }));
  });
  test('should return 400 if no request body is provided', async () => {
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
    };
    const result = await handler(eventMock);

    expect(result.statusCode).toBe(400);
    expect(result.body).toStrictEqual(JSON.stringify({
      message: 'Missing body',
    }));
  });
});
