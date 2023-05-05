import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISubscriber } from '@fit-friends/shared-types';
import { NewTrainingDto } from '@fit-friends/core';
import {
  EMAIL_ADD_SUBSCRIBER_SUBJECT,
  EMAIL_DEL_SUBSCRIBER_SUBJECT,
  EMAIL_NEW_TRAINING_SUBJECT,
} from '../app.constant';

@Injectable()
export class SmtpService {
  constructor(private readonly mailerService: MailerService) {}

  public async notifyAddNewSubscriber(subscriber: ISubscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.userName}`,
        trainer: `${subscriber.trainerName}`,
      },
    });
  }

  public async notifyDelSubscriber(subscriber: ISubscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_DEL_SUBSCRIBER_SUBJECT,
      template: './del-subscriber',
      context: {
        user: `${subscriber.userName}`,
        trainer: `${subscriber.trainerName}`,
      },
    });
  }

  public async notifyNewTraining(subscriber: ISubscriber, newTraining: NewTrainingDto) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_NEW_TRAINING_SUBJECT,
      template: './new-training',
      context: {
        user: `${subscriber.userName}`,
        trainer: `${subscriber.trainerName}`,
        title: `${newTraining.title}`,
        level: `${newTraining.level}`,
        type: `${newTraining.type}`,
        gender: `${newTraining.gender}`,
        calories: `${newTraining.caloriesToLose}`,
        description: `${newTraining.description}`,
        price: `${newTraining.price || 'Бесплатно'}`,
      },
    });
  }
}
