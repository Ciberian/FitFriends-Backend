import { Entity } from '@fit-friends/core';
import { ISubscriber } from '@fit-friends/shared-types';
import { Types } from 'mongoose';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, ISubscriber {
  public id: Types.ObjectId;
  public email: string;
  public userName: string;
  public userId: string;
  public trainerName: string;
  public trainerId: string;

  constructor(emailSubscriber: ISubscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.id = entity.id ?? '';
    this.email = entity.email;
    this.userId = entity.userId;
    this.userName = entity.userName;
    this.trainerId = entity.trainerId;
    this.trainerName = entity.trainerName;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
