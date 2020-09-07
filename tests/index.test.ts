import { handler } from "../src/handler/index";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

describe("Test index", () => {
    test("should return 200 with the query parameters in body ", async () => {
        const queryParameters: Record<string, string> = { message: "Hello world!" };
        const eventParams: Partial<APIGatewayProxyEvent> = { queryStringParameters: queryParameters };
        const event: APIGatewayProxyEvent = <APIGatewayProxyEvent>eventParams;

        const res: APIGatewayProxyResult = await handler(event);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(`Queries: ${JSON.stringify(queryParameters)}`);
    });
});
