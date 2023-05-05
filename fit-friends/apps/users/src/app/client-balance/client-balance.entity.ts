import { Types } from 'mongoose';
import { IClientBalance, GymsData, TrainingsData } from '@fit-friends/shared-types';

export class ClientBalanceEntity implements IClientBalance {
  public _id?: Types.ObjectId;
  public trainings: TrainingsData[];
  public gyms: GymsData[];

  constructor(userBalance: IClientBalance) {
    this.fillEntity(userBalance);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(userBalance: IClientBalance) {
    this._id = userBalance._id;
    this.trainings = userBalance.trainings;
    this.gyms = userBalance.gyms;
  }
}
