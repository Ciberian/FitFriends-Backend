import { Types } from 'mongoose';

export type TrainingsData = {
  trainingId: number;
  availableTrainingsCount: number;
}

export type GymsData = {
  gymId: number;
  seasonPassCount: number;
}

export interface IClientBalance {
  _id?: Types.ObjectId;
  trainings: TrainingsData[]
  gyms: GymsData[]
}
