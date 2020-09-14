import { lambdaHandler } from "../../src/handler/index";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, APIGatewayEventRequestContext } from "aws-lambda";
import { v4 } from "uuid";

describe("Test index", () => {
    test("should return 200 with the query parameters in body", async () => {
        const queryStringParameters: Record<string, string> = { message: "Hello world!" };
        const requestContext: APIGatewayEventRequestContext = <APIGatewayEventRequestContext> { requestId: v4() };
        const headers: Record<string, string> = {};
        const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> { queryStringParameters,  requestContext, headers };
        const contextMock: Context = <Context> { awsRequestId: v4() };

        const res: APIGatewayProxyResult = await lambdaHandler(eventMock, contextMock);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(`Queries: ${JSON.stringify(queryStringParameters)}`);
    });
});
