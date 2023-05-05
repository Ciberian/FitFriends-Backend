import { Types } from 'mongoose';
import { UserRole } from '@fit-friends/shared-types';

export const ENV_FILE_PATH = 'environments/.notify.env';
export const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';
export const EMAIL_ADD_SUBSCRIBER_SUBJECT = 'Подписка на рассылку оформлена';
export const EMAIL_DEL_SUBSCRIBER_SUBJECT = 'Подписка на рассылку отменена';
export const EMAIL_NEW_TRAINING_SUBJECT = 'Новоя тренировка';

export enum EnvValidationMessage {
  SMTPHostRequired = 'SMTP host is required',
  SMTPPortRequired = 'SMTP port is required',
  SMTPServerUserNameRequired = 'SMTP Server user name is required',
  SMTPServerPasswordRequired = 'SMTP Server password is required',
  SMTPServerDefaultFromRequired = 'Default value for mail from field is required',

  RMQHostRequired = 'RabbitMQ host is required',
  RMQUserRequired = 'RabbitMQ user is required',
  RMQPasswordRequired = 'RabbitMQ password is required',
  RMQSubscriberQueue = 'RabbitMQ Subscribers Queue is required',

  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',

  ATSecretRequired = 'Authorization token secret is required',
}

export enum SubscriberValidationMessage {
  EmailNotUnique = 'The subscriber with same email already exists',
  EmailNotValid = 'The email format is not valid',
  SubscribeHimself = 'The trainer cannot subscribe for himself',
  AlreadySubscriber = 'The user already subscribe to this trainer',
  NotFoundSubscriber = 'Current user isn\'t subscriber this trainer',
}

export const EmailSubscriberTest = {
  Result: {
    id: 1,
    userId: '64492fb4d9b7e51ccd8ffa55',
    userName: 'Kate',
    trainerId: '64492fb4d9b7e51ccd8f1e43',
    tranerName: 'Mark',
  },
  User: {
    id: new Types.ObjectId('64492fb4d9b7e51ccd8ffa55'),
    email: '',
    name: '',
    avatar: '',
    role: UserRole.Client,
    favoriteGyms: [1],
  },
  PublisherDto: {
    trainerId: '64492fb4d9b7e51ccd8f1e43',
    trainerName: 'Mark',
  }
};
