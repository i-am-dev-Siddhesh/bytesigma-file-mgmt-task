Certainly! Here's the combined Markdown file with setup instructions for both the server using Prisma ORM and the front-end:

```markdown
# Setup Guide

## Prerequisites
Before starting the setup process, ensure you have Node.js and npm (or Yarn) installed on your machine.

## Server Setup

### Environment Variables

Below are the environment variables required for configuring the server:
- **CLIENT_URL**: The URL of the client application.
- **DATABASE_URL**: The URL of the database server.
- **AWS_S3_BUCKET_NAME**: The name of the AWS S3 bucket used for storing files.
- **AWS_REGION**: The AWS region where the S3 bucket is located.
- **AWS_ACCESS_KEY_ID**: The AWS access key ID for accessing the S3 bucket.
- **AWS_SECRET_ACCESS_KEY**: The AWS secret access key for accessing the S3 bucket.
- **API_KEY**: The API key used for authentication.
- **PORT**: The port on which the server will listen for incoming connections.

Ensure to replace the placeholder values with the actual values corresponding to your application's configuration.
```
### Installation
To install the project dependencies and set up the database schema, run the following command:

#### Using npm
```bash
npm install
npx prisma migrate dev
```

#### Using Yarn
```bash
yarn install
yarn prisma migrate dev
```

### Start Server
Once the dependencies are installed and the database schema is set up, you can start the server using the following commands:

#### Using npm
```bash
npm start
```
This command will start the server in production mode.

#### Using npm (with nodemon for development)
```bash
npm run dev
```
This command will start the server using nodemon, which automatically restarts the server when changes are detected. Useful for development purposes.

#### Using Yarn
```bash
yarn start
```
This command will start the server in production mode.

#### Using Yarn (with nodemon for development)
```bash
yarn dev
```
This command will start the server using nodemon, which automatically restarts the server when changes are detected. Useful for development purposes.

## Frontend Setup

### Environment Variables
Create a `.env.local` file in the root directory of your frontend project and add the following environment variables:

```plaintext
NEXT_PUBLIC_SERVER_API_URL=
NEXT_PUBLIC_SERVER_API_KEY=
```

Ensure to replace the placeholder values with the actual values corresponding to your server.

### Installation
To install the project dependencies, run the following command:


#### Using Yarn
```bash
yarn install
```

### Start Frontend
Once the dependencies are installed and the environment variables are set, you can start the frontend using the following commands:

#### Using npm
```bash
npm run dev
```
This command will start the frontend in development mode.

#### Using Yarn
```bash
yarn dev
```
This command will start the frontend in development mode.

### Accessing the Frontend
Open your web browser and navigate to the URL provided by Next.js, typically `http://localhost:3000`, to access the frontend application.
```

Feel free to copy the entire content as needed.