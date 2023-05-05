import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GymsController } from './gyms.controller';
import { GymsService } from './gyms.service';

@Module({
  imports: [HttpModule],
  controllers: [GymsController],
  providers: [GymsService],
})
export class GymsModule {}
