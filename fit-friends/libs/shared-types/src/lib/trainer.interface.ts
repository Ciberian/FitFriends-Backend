import { UserLevel } from './enums/user-level.enum';
import { TrainingType } from './enums/training-type.enum';
import { IUser } from './user.interface';

export interface ITrainer extends IUser {
  level: UserLevel;
  trainingType: TrainingType;
  certificate: string;
  merits: string;
  personalTraining: boolean;
}
