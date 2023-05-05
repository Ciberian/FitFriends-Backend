import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { INutritionDiary, NutritionData } from '@fit-friends/shared-types';

@Schema({collection: 'nutritionDiaries'})
export class NutritionDiaryModel extends Document implements INutritionDiary {
  @Prop({
    type: Object,
    required: true,
  })
  public mon: NutritionData;

  @Prop({
    type: Object,
    required: true,
  })
  public tue: NutritionData;

  @Prop({
    type: Object,
    required: true,
  })
  public wed: NutritionData;

  @Prop({
    type: Object,
    required: true,
  })
  public thu: NutritionData;

  @Prop({
    type: Object,
    required: true,
  })
  public fri: NutritionData;

  @Prop({
    type: Object,
    required: true,
  })
  public sat: NutritionData;

  @Prop({
    type: Object,
    required: true,
  })
  public sun: NutritionData;

  @Prop({
    type: Number,
    required: true,
  })
  public totalCaloriesPerWeek: number;
}

export const NutritionDiarySchema = SchemaFactory.createForClass(NutritionDiaryModel);
