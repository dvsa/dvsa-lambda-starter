import type {
  APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayEventRequestContext,
} from 'aws-lambda';
import { v4 } from 'uuid';
import { lambdaHandler } from '../../src/handler/index';

describe('Test index', () => {
  test('should return 200 with the query parameters in body', async () => {
    const queryStringParameters: Record<string, string> = { message: 'Hello world!' };
    const apiRequestId: string = v4();
    const requestContext: APIGatewayEventRequestContext = <APIGatewayEventRequestContext> { requestId: apiRequestId };
    const headers: Record<string, string> = {};
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> { queryStringParameters, requestContext, headers };
    const awsRequestId: string = v4();
    const contextMock: Context = <Context> { awsRequestId };

    const res: APIGatewayProxyResult = await lambdaHandler(eventMock, contextMock);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(`Queries: ${JSON.stringify(queryStringParameters)}`);
  });
});
