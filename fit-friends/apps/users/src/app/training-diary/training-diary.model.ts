import { Document  } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITrainingDiary, DayTrainingData } from '@fit-friends/shared-types';

@Schema({collection: 'trainingDiaries'})
export class TrainingDiaryModel extends Document implements ITrainingDiary {
  @Prop({
    type: Object,
    required: true,
  })
  public mon: DayTrainingData;

  @Prop({
    type: Object,
    required: true,
  })
  public tue: DayTrainingData;

  @Prop({
    type: Object,
    required: true,
  })
  public wed: DayTrainingData;

  @Prop({
    type: Object,
    required: true,
  })
  public thu: DayTrainingData;

  @Prop({
    type: Object,
    required: true,
  })
  public fri: DayTrainingData;

  @Prop({
    type: Object,
    required: true,
  })
  public sat: DayTrainingData;

  @Prop({
    type: Object,
    required: true,
  })
  public sun: DayTrainingData;

  @Prop({
    type: Number,
    required: true,
  })
  public totalCaloriesPerWeek: number;
}

export const TrainingDiarySchema = SchemaFactory.createForClass(TrainingDiaryModel);
