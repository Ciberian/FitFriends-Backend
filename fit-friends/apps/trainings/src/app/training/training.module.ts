import { Module } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from '../app.constant';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from '@fit-friends/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      },
    ]),
    MulterModule.registerAsync({
      useFactory: getMulterConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [TrainingController],
  providers: [TrainingRepository, TrainingService, JwtService, ConfigService],
  exports: [TrainingService, TrainingRepository],
})
export class TrainingModule {}
