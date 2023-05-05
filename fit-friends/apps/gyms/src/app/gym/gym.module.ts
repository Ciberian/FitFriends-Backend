import { Module } from '@nestjs/common';
import { GymService } from './gym.service';
import { GymController } from './gym.controller';
import { GymRepository } from './gym.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [GymController],
  providers: [GymRepository, GymService, JwtService],
  exports: [GymService, GymRepository]
})
export class GymModule {}
