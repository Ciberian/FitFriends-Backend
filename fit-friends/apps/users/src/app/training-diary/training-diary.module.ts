import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TrainingDiaryModel,
  TrainingDiarySchema,
} from './training-diary.model';
import { TrainingDiaryRepository } from './training-diary.repository';
import { ClientModule } from '../client/client.module';
import { TrainingDiaryService } from './training-diary.service';
import { TrainingDiaryController } from './training-diary.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TrainingDiaryModel.name, schema: TrainingDiarySchema },
    ]),
    ClientModule,
  ],
  controllers: [TrainingDiaryController],
  providers: [TrainingDiaryRepository, TrainingDiaryService],
  exports: [TrainingDiaryRepository, TrainingDiaryService],
})
export class TrainingDiaryModule {}
