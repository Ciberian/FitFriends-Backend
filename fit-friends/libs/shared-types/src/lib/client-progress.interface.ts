import { Types } from 'mongoose';

export type CaloriesData = {
  caloriesConsumed: number;
  caloriesSpent: number;
  result: number;
  date: Date;
}

export interface IClientProgress {
  _id?: Types.ObjectId;
  mon: CaloriesData;
  tue: CaloriesData;
  wed: CaloriesData;
  thu: CaloriesData;
  fri: CaloriesData;
  sat: CaloriesData;
  sun: CaloriesData;
}
