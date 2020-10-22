import type { APIGatewayProxyEvent, Context, APIGatewayEventRequestContext } from 'aws-lambda';
import { v4 } from 'uuid';
import { createLogger, Logger } from '../../src/util/logger';

describe('Test logger', () => {
  test('createLogger() via context lambdaId should return a logger object with the correct logFormat', () => {
    const queryStringParameters: Record<string, string> = { message: 'Hello world!' };
    const apiRequestId: string = v4();
    const requestContext: APIGatewayEventRequestContext = <APIGatewayEventRequestContext> { requestId: apiRequestId };
    const headers: Record<string, string> = {};
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> { queryStringParameters, requestContext, headers };
    const awsRequestId: string = v4();
    const contextMock: Context = <Context> { awsRequestId };

    const logger: Logger = createLogger(eventMock, contextMock);

    expect(logger.logFormat).toBe(
      `{ "apiRequestId": "${apiRequestId}", "correlationId": "${awsRequestId}", "message": "%s" }`,
    );
  });

  test('createLogger() via header should return a logger object with the correct logFormat', () => {
    const queryStringParameters: Record<string, string> = { message: 'Hello world!' };
    const apiRequestId: string = v4();
    const requestContext: APIGatewayEventRequestContext = <APIGatewayEventRequestContext> { requestId: apiRequestId };
    const headerCorrelationId: string = v4();
    const headers: Record<string, string> = { 'X-Correlation-Id': headerCorrelationId };
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> { queryStringParameters, requestContext, headers };
    const contextMock: Context = <Context> { };

    const logger: Logger = createLogger(eventMock, contextMock);

    expect(logger.logFormat).toBe(
      `{ "apiRequestId": "${apiRequestId}", "correlationId": "${headerCorrelationId}", "message": "%s" }`,
    );
  });

  test('createLogger() should set the correlationId to awsRequestId when invoked without an X-Correlation-Id header',
    () => {
      const queryStringParameters: Record<string, string> = {};
      const apiRequestId: string = v4();
      const requestContext: APIGatewayEventRequestContext = <APIGatewayEventRequestContext> { requestId: apiRequestId };
      const headers: Record<string, string> = {}; // no headers
      const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> { queryStringParameters, requestContext, headers };
      const awsRequestId: string = v4();
      const contextMock: Context = <Context> { awsRequestId };

      const logger: Logger = createLogger(eventMock, contextMock);

      expect(logger.logFormat).toBe(
        `{ "apiRequestId": "${apiRequestId}", "correlationId": "${awsRequestId}", "message": "%s" }`,
      );
    });

  test('logger.debug() calls console.debug() with expected parameters', () => {
    const logger: Logger = new Logger('', '');
    console.debug = jest.fn();

    logger.debug('hello');

    expect(console.debug).toHaveBeenCalledWith(logger.logFormat, 'hello');
  });

  test('logger.info() calls console.info() with expected parameters', () => {
    const logger: Logger = new Logger('', '');
    console.info = jest.fn();

    logger.info('hello');

    expect(console.info).toHaveBeenCalledWith(logger.logFormat, 'hello');
  });

  test('logger.warn() calls console.warn() with expected parameters', () => {
    const logger: Logger = new Logger('', '');
    console.warn = jest.fn();

    logger.warn('hello');

    expect(console.warn).toHaveBeenCalledWith(logger.logFormat, 'hello');
  });

  test('logger.error() calls console.error() with expected parameters', () => {
    const logger: Logger = new Logger('', '');
    console.error = jest.fn();

    logger.error('hello');

    expect(console.error).toHaveBeenCalledWith(logger.logFormat, 'hello');
  });
});
