import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, RTStrategy } from '@fit-friends/core';
import { TrainerModule } from '../trainer/trainer.module';
import { ClientModule } from '../client/client.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ClientBalanceModule } from '../client-balance/client-balance.module';
import { NutritionDiaryModule } from '../nutrition-diary/nutrition-diary.module';
import { TrainingDiaryModule } from '../training-diary/training-diary.module';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from '@fit-friends/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientModule,
    TrainerModule,
    ClientBalanceModule,
    NutritionDiaryModule,
    TrainingDiaryModule,
    PassportModule,
    JwtModule.register({}),
    MulterModule.registerAsync({
      useFactory: getMulterConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RTStrategy, ConfigService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('users/login');
  }
}
