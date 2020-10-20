import type { APIGatewayProxyEvent, Context } from 'aws-lambda';

export class Logger {
  logFormat: string;

  constructor(apiRequestId: string, correlationId: string) {
    this.logFormat = `{ "apiRequestId": "${apiRequestId}", "correlationId": "${correlationId}", "message": "%s" }`;
  }

  public debug(msg: string): void {
    console.debug(this.logFormat, msg);
  }

  public info(msg: string): void {
    console.info(this.logFormat, msg);
  }

  public warn(msg: string): void {
    console.warn(this.logFormat, msg);
  }

  public error(msg: string): void {
    console.error(this.logFormat, msg);
  }
}

export const createLogger = (event: APIGatewayProxyEvent, context: Context): Logger => {
  const lambdaRequestId: string = context.awsRequestId;
  const apiRequestId: string = event?.requestContext.requestId;
  const correlationId: string = event?.headers?.['X-Correlation-Id'] || lambdaRequestId;

  return new Logger(apiRequestId, correlationId);
};
