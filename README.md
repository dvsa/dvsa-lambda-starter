# lambda-starter
A starting pattern for AWS lambda in Typescript 

**Requirements**
- node v12.18.3
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

**Build**
- `npm i`
- `npm run build:dev`

**Run Lambdas Locally**
- `npm run start:dev`
- To ensure that the lambdas have been successfully served, run the following command in a separate terminal:
    - `curl --request GET http://localhost:3000/?message=hello%20world`
    - response should be: `{"pathParams": {"message": "hello world"}}`

**Debug Lambdas Locally (VS Code only)**
- Run lambdas in debug mode: `npm run start:dev -- -d 5858`
- Add a breakpoint to the lambda being tested (`src/handler/index.ts`)
- Run the debug config from VS Code that corresponds to lambda being tested (`IndexLambdaFunction`)
- Send an HTTP request to the lambda's URI (`curl --request GET http://localhost:3000/?message=hello%20world`)


**Tests**
- The [Jest](https://jestjs.io/) framework is used to run tests and collect code coverage
- To run the tests, run the following command within the root directory of the project: `npm test`
- Coverage results will be displayed on terminal and stored in the `coverage` directory
    - The coverage requirements can be set in `jest.config.js`
