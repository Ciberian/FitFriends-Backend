import { Types } from 'mongoose';

export type NutritionData = {
  breakfast: number;
  lunch: number;
  dinner: number;
  snack: number;
  totalCaloriesPerDay: number;
  date: Date;
}

export interface INutritionDiary {
  _id?: Types.ObjectId;
  mon: NutritionData;
  tue: NutritionData;
  wed: NutritionData;
  thu: NutritionData;
  fri: NutritionData;
  sat: NutritionData;
  sun: NutritionData;
  totalCaloriesPerWeek: number;
}
