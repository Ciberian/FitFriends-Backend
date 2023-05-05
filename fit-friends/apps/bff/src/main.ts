import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

const SERVICE_TITLE = 'The «Fit friends BFF» service';
const SERVICE_DESCRIPTION = 'Fit friends BFF service API';
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

  app.setGlobalPrefix(GLOBAL_PREFIX);
  const port = process.env.PORT || DEFAULT_PORT;

  await app.listen(port);
  Logger.log(`🚀 BFF is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
