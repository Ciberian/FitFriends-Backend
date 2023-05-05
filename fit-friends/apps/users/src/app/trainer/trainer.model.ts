import {
  ITrainer,
  UserLevel,
  MetroStation,
  TrainingType,
  UserGender,
  UserRole,
  IAlert
} from '@fit-friends/shared-types';
import { UsersErrorMessage } from '@fit-friends/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserName } from '../app.constant';
import { Document } from 'mongoose';

@Schema({collection: 'trainers'})
export class TrainerModel extends Document implements ITrainer {
  @Prop({
    required: true,
    minlength: [UserName.MinLength, UsersErrorMessage.NameMinLengthNotValid],
    maxlength: [UserName.MaxLength, UsersErrorMessage.NameMaxLengthNotValid],
    match: [/^([а-яё]+|[a-z]+)$/i, UsersErrorMessage.NameNotValid]
  })
  public name: string;

  @Prop({
    required: true,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, UsersErrorMessage.EmailNotValid]
  })
  public email: string;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserGender,
    default: UserGender.Irrelevant
  })
  public gender: UserGender;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Trainer
  })
  public role: UserRole;

  @Prop({
    required: true,
    type: String,
    enum: MetroStation
  })
  public location: MetroStation;

  @Prop()
  public birthDate: Date;

  @Prop({
    match: [/^(?:.*\.(?=(jpg|jpeg|png)$))?[^.]*$/i, UsersErrorMessage.ImageFormatNotValid]
  })
  public avatar: string;

  @Prop({
    required: true
  })
  public friends: string[];

  @Prop({
    required: true
  })
  public alerts: IAlert[];

  @Prop({
    required: true
  })
  public registrationDate: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserLevel
  })
  public level: UserLevel;

  @Prop({
    required: true,
    type: String,
    enum: TrainingType
  })
  public trainingType: TrainingType;

  @Prop({
    required: true
  })
  public certificate: string;

  @Prop({
    required: true
  })
  public merits: string;

  @Prop({
    required: true
  })
  public personalTraining: boolean;

  @Prop()
  public refreshTokenHash: string;
}

export const TrainerSchema = SchemaFactory.createForClass(TrainerModel);
