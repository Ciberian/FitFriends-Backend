import { UserLevel } from './enums/user-level.enum';
import { TrainingDuration } from './enums/training-duration.enum';
import { TrainingType } from './enums/training-type.enum';
import { UserGender } from './enums/user-gender.enum';

export interface ITraining {
  id?: number;
  title: string;
  image: string;
  level: UserLevel;
  type: TrainingType[];
  duration: TrainingDuration;
  gender: UserGender;
  caloriesToLose: number;
  description: string;
  video: string;
  price?: number;
  rating?: number;
  ratingSum: number;
  reviewsCount: number;
  trainer?: string;
  isSpecialOffer?: boolean;
}
