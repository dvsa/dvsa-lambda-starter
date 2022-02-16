# lambda-starter

A starting pattern for AWS lambda in Typescript 

**Requirements**

- node v14.17.3
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- npm 7+

**Prerequisites**
- Create a `.env`
    ```shell
    cp .env.example .env
    ```

**Build**

- `npm i`
- `npm run build:dev`

**Watch**

To watch for changes and automatically trigger a new build:
- `npm run watch:dev`


**Run Lambdas Locally**

- Build the files first
- `npm run start:dev`
- To ensure that the lambdas have been successfully served, run the following command in a separate terminal:
    - `curl --request GET http://localhost:3000/?message=hello%20world`
    - the response should be: `{"queryParams": {"message": "hello world"}}`
- To run CloudWatch Event lambdas: `npm run invoke -- CloudWatchEventLambdaFunction`


**Debug Lambdas Locally (VS Code only)**

- Run lambdas in debug mode: `npm run start:dev -- -d 5858`
- Add a breakpoint to the lambda being tested (`src/handler/get.ts`)
- Run the debug config from VS Code that corresponds to lambda being tested (`GetLambdaFunction`)
- Send an HTTP request to the lambda's URI (`curl --request GET http://localhost:3000/?message=hello%20world`)
- To debug CloudWatch Event lambdas: `npm run invoke -- CWEventLambdaFunction -d 5858`


**Tests**

- The [Jest](https://jestjs.io/) framework is used to run tests and collect code coverage
- To run the tests, run the following command within the root directory of the project: `npm test`
- Coverage results will be displayed on terminal and stored in the `coverage` directory
    - The coverage requirements can be set in `jest.config.js`


**Logging**
Logging is handled by `https://github.com/winstonjs/winston`. A pre-configured logger is available, and can be used like so:

```ts
import logger from "../utils/logger";

logger.info('Hello world');
logger.error('Hello world');
logger.warn('Hello world');
```

**Tip:** It's usually a good idea to attach the `requestId` and any `X-Correlation-Id` to the logger object's meta data so every log message will contain these useful bits of information.

```ts
  const event: APIGatewayProxyEvent = currentInvoke.event as APIGatewayProxyEvent;
  const correlationId: string = event.headers['X-Correlation-Id'] || (currentInvoke.context as Context).awsRequestId;

  const { requestId } = event.requestContext;

  req.app.locals.correlationId = correlationId;
  req.app.locals.requestId = requestId;

  Logger.defaultMeta = { requestId, correlationId };
```
