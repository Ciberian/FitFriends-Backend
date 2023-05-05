import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ITrainingDiary } from '@fit-friends/shared-types';
import { ICRUDRepository } from '@fit-friends/core';
import { TrainingDiaryEntity } from './training-diary.entity';
import { TrainingDiaryModel } from './training-diary.model';
import { DEFAULT_TRAINING_DIARY } from '../app.constant';

@Injectable()
export class TrainingDiaryRepository
  implements
    ICRUDRepository<TrainingDiaryEntity, Types.ObjectId, ITrainingDiary>
{
  constructor(
    @InjectModel(TrainingDiaryModel.name)
    private readonly trainingDiaryModel: Model<TrainingDiaryModel>
  ) {}

  private defaultTrainingDiary: ITrainingDiary = DEFAULT_TRAINING_DIARY;

  public async create(
    item: TrainingDiaryEntity = new TrainingDiaryEntity(
      this.defaultTrainingDiary
    )
  ): Promise<ITrainingDiary> {
    const newTrainingDairy = new this.trainingDiaryModel(item);

    return newTrainingDairy.save();
  }

  public async findById(id: Types.ObjectId): Promise<ITrainingDiary | null> {
    return this.trainingDiaryModel.findById(id).exec();
  }

  public async update(
    id: Types.ObjectId,
    item: Partial<TrainingDiaryEntity>
  ): Promise<ITrainingDiary> {
    return this.trainingDiaryModel
      .findByIdAndUpdate(id, item, { new: true })
      .exec();
  }

  public async delete(id: Types.ObjectId): Promise<void> {
    this.trainingDiaryModel.deleteOne({ id });
  }
}
