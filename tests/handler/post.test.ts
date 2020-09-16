import type {
  APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayEventRequestContext,
} from 'aws-lambda';
import { v4 } from 'uuid';
import { handler } from '../../src/handler/post';

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
    const contextMock: Context = <Context> { awsRequestId: v4() };

    const res: APIGatewayProxyResult = await handler(eventMock, contextMock);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(JSON.stringify({ body }));
  });
});
