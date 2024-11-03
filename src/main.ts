import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('ServerMain-StarwarsService');


async function bootstrap() {
  //Listen Requests
  const app = await NestFactory.create(AppModule);
  const portHTTP = 3011;
  await app.listen(portHTTP, () => {
    logger.log(`TicketService HTTP server is listening on port ${portHTTP}`)
  });
}

bootstrap();
