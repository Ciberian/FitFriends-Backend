import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { servicesConfig } from '@fit-friends/config';
import { UsersModule } from './users/users.module';
import { TrainingsModule } from './trainings/trainings.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { GymsModule } from './gyms/gyms.module';
import { NotifyModule } from './notify/notify.module';
import { ENV_FILE_PATH } from './app.const';
import { envSchema } from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [servicesConfig],
      validationSchema: envSchema,
    }),
    UsersModule,
    TrainingsModule,
    OrdersModule,
    ReviewsModule,
    GymsModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
