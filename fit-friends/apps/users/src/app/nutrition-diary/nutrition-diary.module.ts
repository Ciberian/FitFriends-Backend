import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NutritionDiaryModel, NutritionDiarySchema } from './nutrition-diary.model';
import { NutritionDiaryRepository } from './nutrition-diary.repository';
import { ClientModule } from '../client/client.module';
import { NutritionDiaryController } from './nutrition-diary.controller';
import { NutritionDiaryService } from './nutrition-diary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NutritionDiaryModel.name, schema: NutritionDiarySchema },
    ]),
    ClientModule,
  ],
  controllers: [NutritionDiaryController],
  providers: [NutritionDiaryRepository, NutritionDiaryService],
  exports: [NutritionDiaryRepository, NutritionDiaryService],
})
export class NutritionDiaryModule {}
