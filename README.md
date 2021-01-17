# Youtube API

Returns videos for a search term and how much time you will spend watching them all.

This api contains:

- Unit and integration tests;
- Log system;
- Based on clean architecture;
- [Documentation.](https://github.com/KelwinHenrique/Youtube-API/blob/main/DOCS.md);
- Docker;

## How to run the project with docker

1) Run in the root project `sudo docker-compose up` to initialize the container.

2) Run the comand bellow in your terminal:
```json
  curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/videos?search=dogs%happy&limit=20&daysOfWeek=10%2C10%2C10%2C10%2C10%2C10%2C10
```

## How to run the project without Docker

1) Run `npm i` to install all the dependencies of the project.

2) Run `npm run star:dev` to initialize the api.

3) Run the comand bellow in your terminal:
```json
  curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/videos?search=dogs%happy&limit=20&daysOfWeek=10%2C10%2C10%2C10%2C10%2C10%2C10
```

## How to run tests

Run `npm run test` to execute all(unit and integrations) tests of the api.

## How to run documentation

1) Run `npm run docs` to create the documentation.

2) Enter the folder coverage/lcov-report and execute index.html

3) Or you can click [here](https://github.com/KelwinHenrique/Youtube-API/blob/main/DOCS.md)

## Architecture

```bash
├── src
│   ├── api
│   │   ├── videos
│   │   │   ├── use-case
│   │   │   │   ├── get-videos-by-search
│   │   │   │   │   ├── get-videos-by-search.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── get-videos-by-search.test.js
│   │   │   │   ├── index.js
│   │   │   ├── index.js
│   │   │   ├── routes.js
│   │   │   ├── controller.js
│   ├── index.js
│   ├── core
│   │   ├── config
│   │   │   ├── express
│   │   │   │   ├── index.js
│   │   ├── services
│   │   │   ├── log
│   │   │   │   ├── index.js
│   │   │   │   ├── logger.js
│   │   │   ├── middleware
│   │   │   │   ├── log
│   │   │   │   │   ├── index.js
│   │   │   ├── response
│   │   │   │   ├── index.js
│   │   │   ├── serializers
│   │   │   │   ├── errors.js
│   │   │   │   ├── index.js
├── app.js
├── config.js
├── index.js
├── __tests__
│   ├── integrations
│   │   ├── products
│   │   │   ├── get-videos-by-search.test.js
```

## Main Dependencies

- express: Web framework.
- jest and supertest: Unit test and integration test.
- apiDoc and apidoc-markdown: To create documentation for this API.
- winston and stack-trace: To create logs for this API.
