# About the template

This project is based on the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

Some changes were made to the template to add express for the api and zod for validation.

## Installation/deployment instructions

- Run `npm i` to install the project dependencies

## Test your API

- Run `npm run dev` to start the development server
- Run the following command to test the API

```bash
curl -X POST 'http://localhost:3000/dev/hello' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Ravi"
}'
```
