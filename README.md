# Serverless TODO

My final project for Udacity's Cloud Developer course. This project uses the foundations of Course 5: Develop & Deploy Serverless App and adds testing, as well as a search option to the Todo App.  

# Functionality of the application

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created. The user can also search for a particular TODO item. 

# TODO items

The application should store TODO items, and each TODO item contains the following fields:

* `todoId` (string) - a unique id for an item
* `userId` (string) - an id for the user who created the todo
* `createdAt` (string) - date and time when an item was created
* `name` (string) - name of a TODO item (e.g. "Change a light bulb")
* `dueDate` (string) - date and time by which an item should be completed
* `done` (boolean) - true if an item was completed, false otherwise
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a TODO item


# Functions to be implemented

I've implemented the following functions and configured them in the `serverless.yml` file:

* `Auth` - this function should implement a custom authorizer for API Gateway that should be added to all other functions.
* `GetTodos` - should return all TODOs for a current user.
* `CreateTodo` - should create a new TODO for a current user. 
* `UpdateTodo` - should update a TODO item created by a current user. 
* `DeleteTodo` - should delete a TODO item created by a current user. Expects an id of a TODO item to remove.
* `GenerateUploadUrl` - returns a pre-signed URL that can be used to upload an attachment file for a TODO item.

All functions are already connected to appropriate events from API Gateway.
An id of a user can be extracted from a JWT token passed by a client.

I've also added necessary resources to the `resources` section of the `serverless.yml` file such as the DynamoDB table and S3 bucket.


# Frontend

The `client` folder contains a web application that can use the API that should be developed in the project.

This frontend should work with your serverless application once it is developed, you don't need to make any changes to the code. The only file that you need to edit is the `config.ts` file in the `client` folder. This file configures your client application just as it was done in the course and contains an API endpoint and Auth0 configuration:

```ts
const apiId = '...' API Gateway id
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: '...',    // Domain from Auth0
  clientId: '...',  // Client id from an Auth0 application
  callbackUrl: 'http://localhost:3000/callback'
}
```

## Authentication

To implement authentication in your application, you would have to create an Auth0 application and copy "domain" and "client id" to the `config.ts` file in the `client` folder. We recommend using asymmetrically encrypted JWT tokens.

# Best practices

* Permissions - Permissions are defined per function in the functions section and all resources needed by an application are defined in the `serverless.yml` file.
* Logging - I have implimented the [Winston](https://github.com/winstonjs/winston) logger that creates [JSON formatted](https://stackify.com/what-is-structured-logging-and-why-developers-need-it/) log statements. 
* Validated HTTP requests - Incoming HTTP requests are validated using request validation in API Gateway (serverless-reqvalidator-plugin)
* 1:M - 1 to many relationship between users and TODO items is modeled using a DynamoDB table
* Query() - TODO items are fetched using the "query()" method

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless TODO application.
