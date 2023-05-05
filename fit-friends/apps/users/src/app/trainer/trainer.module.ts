import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerModel, TrainerSchema } from './trainer.model';
import { TrainerRepository } from './trainer.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TrainerModel.name, schema: TrainerSchema }]),
  ],
  providers: [TrainerRepository],
  exports: [TrainerRepository],
})
export class TrainerModule {}
