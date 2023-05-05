import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ISubscriber } from '@fit-friends/shared-types';
import { ICRUDRepository } from '@fit-friends/core';
import { EmailSubscriberModel } from './email-subscriber.model';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberRepository
  implements
    ICRUDRepository<EmailSubscriberEntity, Types.ObjectId, ISubscriber>
{
  constructor(
    @InjectModel(EmailSubscriberModel.name)
    private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  public async create(item: EmailSubscriberEntity): Promise<ISubscriber> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);

    return newEmailSubscriber.save();
  }

  public async findById(id: Types.ObjectId): Promise<ISubscriber | null> {
    return this.emailSubscriberModel.findOne({ id }).exec();
  }

  public async findByTrainerId(
    trainerId: string
  ): Promise<ISubscriber[] | null> {
    return this.emailSubscriberModel.find({ trainerId: trainerId }).exec();
  }

  public async findSubscriber(
    userId: Types.ObjectId,
    trainerId: Types.ObjectId
  ): Promise<ISubscriber | null> {
    return this.emailSubscriberModel
      .findOne({ $and: [{ userId: userId }, { trainerId: trainerId }] })
      .exec();
  }

  public async update(
    id: Types.ObjectId,
    item: EmailSubscriberEntity
  ): Promise<ISubscriber> {
    return this.emailSubscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async delete(subscriberId: Types.ObjectId): Promise<void> {
    this.emailSubscriberModel.deleteOne({ _id: subscriberId }).exec();
  }
}
