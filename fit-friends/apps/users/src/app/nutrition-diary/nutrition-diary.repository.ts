import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { INutritionDiary } from '@fit-friends/shared-types';
import { ICRUDRepository } from '@fit-friends/core';
import { NutritionDiaryEntity } from './nutrition-diary.entity';
import { NutritionDiaryModel } from './nutrition-diary.model';
import { DEFAULT_NUTRITION_DIARY } from '../app.constant';

@Injectable()
export class NutritionDiaryRepository
  implements
    ICRUDRepository<NutritionDiaryEntity, Types.ObjectId, INutritionDiary>
{
  constructor(
    @InjectModel(NutritionDiaryModel.name)
    private readonly nutritionDiaryModel: Model<NutritionDiaryModel>
  ) {}

  private defaultNutritionDiary: INutritionDiary = DEFAULT_NUTRITION_DIARY;

  public async create(
    item: NutritionDiaryEntity = new NutritionDiaryEntity(
      this.defaultNutritionDiary
    )
  ): Promise<INutritionDiary> {
    const newNutritionDairy = new this.nutritionDiaryModel(item);

    return newNutritionDairy.save();
  }

  public async findById(id: Types.ObjectId): Promise<INutritionDiary | null> {
    return this.nutritionDiaryModel.findById(id).exec();
  }

  public async update(
    id: Types.ObjectId,
    item: Partial<NutritionDiaryEntity>
  ): Promise<INutritionDiary> {
    return this.nutritionDiaryModel
      .findByIdAndUpdate(id, item, { new: true })
      .exec();
  }

  public async delete(id: Types.ObjectId): Promise<void> {
    this.nutritionDiaryModel.deleteOne({ id });
  }
}
