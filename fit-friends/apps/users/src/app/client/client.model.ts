import {
  IClient,
  UserLevel,
  MetroStation,
  TrainingDuration,
  TrainingType,
  UserGender,
  UserRole,
  IClientProgress,
  IAlert
} from '@fit-friends/shared-types';
import { UsersErrorMessage } from '@fit-friends/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserName } from '../app.constant';

@Schema({collection: 'clients'})
export class ClientModel extends Document implements IClient {
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
    default: UserRole.Client
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
  })
  public trainingType: TrainingType[];

  @Prop({
    required: true,
    type: String,
    enum: TrainingDuration
  })
  public trainingDuration: TrainingDuration;

  @Prop({
    required: true
  })
  public caloriesToLose: number;

  @Prop({
    required: true
  })
  public caloriesToLosePerDay: number;

  @Prop({
    required: true
  })
  public description: string;

  @Prop({
    required: true
  })
  public readyToTraining: boolean;

  @Prop({
    required: true
  })
  public favoriteGyms: number[];

  @Prop({
    required: true
  })
  public nutritionDiaryId: Types.ObjectId;

  @Prop({
    required: true
  })
  public trainingDiaryId: Types.ObjectId;

  @Prop({
    required: true
  })
  public balanceId: Types.ObjectId;

  @Prop({
    type: Object,
    required: true
  })
  public clientProgress: IClientProgress;

  @Prop()
  public refreshTokenHash: string;
}

export const ClientSchema = SchemaFactory.createForClass(ClientModel);
