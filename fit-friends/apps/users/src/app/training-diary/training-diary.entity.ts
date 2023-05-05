import { Types } from 'mongoose';
import { ITrainingDiary, DayTrainingData } from '@fit-friends/shared-types';

export class TrainingDiaryEntity implements ITrainingDiary {
  public _id?: Types.ObjectId;
  public mon: DayTrainingData;
  public tue: DayTrainingData;
  public wed: DayTrainingData;
  public thu: DayTrainingData;
  public fri: DayTrainingData;
  public sat: DayTrainingData;
  public sun: DayTrainingData;
  public totalCaloriesPerWeek: number;

  constructor(trainingDiary: ITrainingDiary) {
    this.fillEntity(trainingDiary);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(trainingDiary: ITrainingDiary) {
    this._id = trainingDiary._id;
    this.mon = trainingDiary.mon;
    this.tue = trainingDiary.tue;
    this.wed = trainingDiary.wed;
    this.thu = trainingDiary.thu;
    this.fri = trainingDiary.fri;
    this.sat = trainingDiary.sat;
    this.sun = trainingDiary.sun;
    this.totalCaloriesPerWeek = trainingDiary.totalCaloriesPerWeek;
  }
}
