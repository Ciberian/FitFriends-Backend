import { Types } from 'mongoose';

export interface ISubscriber {
  id?: Types.ObjectId;
  email: string;
  userName: string;
  userId: string;
  trainerId: string;
  trainerName: string;
}
