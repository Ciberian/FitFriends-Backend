import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

const ServiceConfig = {
  Title: 'The «Fit friends BFF» service',
  Description: 'Fit friends BFF service API',
  Version: '1.0',
  SpecPath: 'spec',
  GlobalPrefix: 'api',
} as const;

const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(ServiceConfig.Title)
    .setDescription(ServiceConfig.Description)
    .setVersion(ServiceConfig.Version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(ServiceConfig.SpecPath, app, document);

  app.setGlobalPrefix(ServiceConfig.GlobalPrefix);

  await app.listen(port);
  Logger.log(`🚀 BFF is running on: http://localhost:${port}/${ServiceConfig.GlobalPrefix}`);
}

bootstrap();
