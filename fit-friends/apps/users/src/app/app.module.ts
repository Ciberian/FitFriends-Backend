import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { TrainerModule } from './trainer/trainer.module';
import { getMongoDbConfig, getServeStaticConfig, staticConfig } from '@fit-friends/config';
import { jwtConfig, databaseConfig } from '@fit-friends/config';
import { ClientBalanceModule } from './client-balance/client-balance.module';
import { NutritionDiaryModule } from './nutrition-diary/nutrition-diary.module';
import { TrainingDiaryModule } from './training-diary/training-diary.module';
import { ENV_FILE_PATH } from './app.constant';
import envSchema from './env.schema';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtConfig, staticConfig],
      validationSchema: envSchema,
    }),
    ServeStaticModule.forRootAsync({
      useFactory: getServeStaticConfig,
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    AuthModule,
    ClientModule,
    TrainerModule,
    NutritionDiaryModule,
    TrainingDiaryModule,
    ClientBalanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
