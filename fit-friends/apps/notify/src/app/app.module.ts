import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '@fit-friends/config';
import { smtpOptions } from '../config/notify.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { getMongoDbConfig, mongoDbOptions } from '../config/mongodb.config';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { validateEnvironments } from './env.validation';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@fit-friends/core';
import { JwtModule } from '@nestjs/jwt';
import { ENV_FILE_PATH } from './app.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [smtpOptions, mongoDbOptions, rabbitMqOptions, jwtConfig],
      validate: validateEnvironments
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
