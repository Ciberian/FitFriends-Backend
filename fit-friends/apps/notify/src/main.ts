import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { getRabbitMqConfig } from './config/rabbitmq.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const ServiceConfig = {
  Title: 'The «Notify» service',
  Description: 'Notify service API',
  Version: '1.0',
  SpecPath: 'spec',
  GlobalPrefix: 'api',
} as const;

const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const config = new DocumentBuilder()
    .setTitle(ServiceConfig.Title)
    .setDescription(ServiceConfig.Description)
    .setVersion(ServiceConfig.Version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(ServiceConfig.SpecPath, app, document);

  app.connectMicroservice(getRabbitMqConfig(configService));
  await app.startAllMicroservices();
  Logger.log(`🚀 Notify service is running on`);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(ServiceConfig.GlobalPrefix);
  await app.listen(port);
  Logger.log(`🚀 Notify is running on: http://localhost:${port}/${ServiceConfig.GlobalPrefix}`);
}

bootstrap();
