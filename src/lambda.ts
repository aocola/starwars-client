//import 'tsconfig-paths/register'; // Añade esta línea al inicio/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler, Context, Callback } from 'aws-lambda';
import * as awsServerlessExpress from 'aws-serverless-express';
import { Server } from 'http';

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
  return awsServerlessExpress.createServer(app.getHttpAdapter().getInstance());
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE').promise;
};