import { Types } from 'mongoose';
import { INutritionDiary, NutritionData } from '@fit-friends/shared-types';

export class NutritionDiaryEntity implements INutritionDiary {
  public _id?: Types.ObjectId;
  public mon: NutritionData;
  public tue: NutritionData;
  public wed: NutritionData;
  public thu: NutritionData;
  public fri: NutritionData;
  public sat: NutritionData;
  public sun: NutritionData;
  public totalCaloriesPerWeek: number;

  constructor(nutritionDiary: INutritionDiary) {
    this.fillEntity(nutritionDiary);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(nutritionDiary: INutritionDiary) {
    this._id = nutritionDiary._id;
    this.mon = nutritionDiary.mon;
    this.tue = nutritionDiary.tue;
    this.wed = nutritionDiary.wed;
    this.thu = nutritionDiary.thu;
    this.fri = nutritionDiary.fri;
    this.sat = nutritionDiary.sat;
    this.sun = nutritionDiary.sun;
    this.totalCaloriesPerWeek = nutritionDiary.totalCaloriesPerWeek;
  }
}
