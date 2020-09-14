import { createLogger, Logger } from "../util/logger";
import type { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const logger: Logger = createLogger(event, context);
    const queries = JSON.stringify(event.queryStringParameters);

    logger.info(`The following queries were found: ${queries}`);

    return {
        statusCode: 200,
        body: `Queries: ${queries}`
    };
};
