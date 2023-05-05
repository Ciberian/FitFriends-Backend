import { Types } from 'mongoose';
import { TrainingDuration } from './enums/training-duration.enum';

export type TrainingData = {
  trainingTitle: string;
  calories: number;
  duration: TrainingDuration;
}
export type DayTrainingData = {
  trainings: TrainingData[];
  totalCaloriesPerDay: number;
  date: Date;
}

export interface ITrainingDiary {
  _id?: Types.ObjectId;
  mon: DayTrainingData;
  tue: DayTrainingData;
  wed: DayTrainingData;
  thu: DayTrainingData;
  fri: DayTrainingData;
  sat: DayTrainingData;
  sun: DayTrainingData;
  totalCaloriesPerWeek: number;
}
