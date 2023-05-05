import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GymModule } from './gym/gym.module';
import { PrismaModule } from './prisma/prisma.module';
import { ENV_FILE_PATH } from './app.constant';
import { jwtConfig } from '@fit-friends/config'
import { JwtStrategy } from '@fit-friends/core';
import envSchema from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtConfig],
      validationSchema: envSchema,
    }),
    GymModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
