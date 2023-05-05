import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PublisherDto, NewTrainingDto } from '@fit-friends/core';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { SubscriberValidationMessage } from '../app.constant';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { SmtpService } from '../smtp/smtp.service';
import { ISubscriber, ITokenPayload } from '@fit-friends/shared-types';
import { Types } from 'mongoose';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly smtpService: SmtpService
  ) {}

  public async addSubscriber(publisher: PublisherDto, user: ITokenPayload) {
    const existSubscriber = await this.emailSubscriberRepository.findSubscriber(user.id, new Types.ObjectId(publisher.trainerId));

    if (existSubscriber) {
      throw new ConflictException(SubscriberValidationMessage.AlreadySubscriber);
    }

    if (String(user.id) === publisher.trainerId) {
      throw new ConflictException(SubscriberValidationMessage.SubscribeHimself);
    }

    const subscriber: ISubscriber = {
      email: user.email,
      userId: String(user.id),
      userName: user.name,
      trainerId: publisher.trainerId,
      trainerName: publisher.trainerName,
    };

    this.smtpService.notifyAddNewSubscriber(subscriber);

    return this.emailSubscriberRepository.create(new EmailSubscriberEntity(subscriber));
  }

  public async delSubscriber(publisherId: string, user: ITokenPayload) {
    const subscriber = await this.emailSubscriberRepository.findSubscriber(user.id, new Types.ObjectId(publisherId));

    if (!subscriber) {
      throw new NotFoundException(SubscriberValidationMessage.NotFoundSubscriber);
    }

    this.emailSubscriberRepository.delete(subscriber.id);
    this.smtpService.notifyDelSubscriber(subscriber);
  }

  public async sendNewTraining(newTraining: NewTrainingDto) {
    const subscribers = await this.emailSubscriberRepository.findByTrainerId(newTraining.trainer);

    subscribers.forEach((subscriber: ISubscriber) => {
      this.smtpService.notifyNewTraining(subscriber, newTraining);
    });
  }
}
