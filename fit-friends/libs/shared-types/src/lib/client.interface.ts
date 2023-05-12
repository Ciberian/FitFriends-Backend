import { UserLevel } from './enums/user-level.enum';
import { TrainingDuration } from './enums/training-duration.enum';
import { TrainingType } from './enums/training-type.enum';
import { IUser } from './user.interface';
import { Types } from 'mongoose';
import { IClientProgress } from './client-progress.interface';

export interface IClient extends IUser {
  level: UserLevel;
  trainingType: TrainingType[];
  trainingDuration: TrainingDuration;
  caloriesToLose: number;
  caloriesToLosePerDay: number;
  description: string;
  readyToTraining: boolean;
  favoriteGyms?: number[];
  nutritionDiaryId?: Types.ObjectId;
  trainingDiaryId?: Types.ObjectId;
  balanceId?: Types.ObjectId;
  clientProgress: IClientProgress;
}
