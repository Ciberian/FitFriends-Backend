import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { getRabbitMqConfig } from './config/rabbitmq.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const SERVICE_TITLE = 'The «Notify» service';
const SERVICE_DESCRIPTION = 'Notify service API';
const SERVICE_VERSION = '1.0';
const SPECIFICATION_PATH = 'spec';
const GLOBAL_PREFIX = 'api';
const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const config = new DocumentBuilder()
    .setTitle(SERVICE_TITLE)
    .setDescription(SERVICE_DESCRIPTION)
    .setVersion(SERVICE_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SPECIFICATION_PATH, app, document);

  app.connectMicroservice(getRabbitMqConfig(configService));
  await app.startAllMicroservices();
  Logger.log(`🚀 Notify service is running on`);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(GLOBAL_PREFIX);
  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
  Logger.log(`🚀 Notify is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
