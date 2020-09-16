import type {
  APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayEventRequestContext,
} from 'aws-lambda';
import { v4 } from 'uuid';
import { handler } from '../../src/handler/get';

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
    const contextMock: Context = <Context> { awsRequestId: v4() };

    const res: APIGatewayProxyResult = await handler(eventMock, contextMock);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(JSON.stringify({ queryParams: queryStringParameters }));
  });
});
