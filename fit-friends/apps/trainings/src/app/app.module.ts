import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrainingModule } from './training/training.module';
import { ENV_FILE_PATH } from './app.constant';
import { getServeStaticConfig, jwtConfig, staticConfig } from '@fit-friends/config'
import { JwtStrategy } from '@fit-friends/core';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { ReviewModule } from './review/review.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import envSchema from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtConfig, rabbitMqOptions, staticConfig],
      validationSchema: envSchema,
    }),
    ServeStaticModule.forRootAsync({
      useFactory: getServeStaticConfig,
      inject: [ConfigService],
    }),
    ReviewModule,
    OrderModule,
    TrainingModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
