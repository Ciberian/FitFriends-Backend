import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

const SERVICE_TITLE = 'The «Users» service';
const SERVICE_DESCRIPTION = 'Users service API';
const SERVICE_VERSION = '1.0';
const SPECIFICATION_PATH = 'spec';
const GLOBAL_PREFIX = 'api';
const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(SERVICE_TITLE)
    .setDescription(SERVICE_DESCRIPTION)
    .setVersion(SERVICE_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SPECIFICATION_PATH, app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(GLOBAL_PREFIX);
  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Users application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
