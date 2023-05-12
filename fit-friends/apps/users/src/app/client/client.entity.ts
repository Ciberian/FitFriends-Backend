import { Types } from 'mongoose';
import { genSalt, compare, hash } from 'bcrypt';
import { SALT_ROUNDS } from '../app.constant';
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

export class ClientEntity implements IClient {
  public _id: Types.ObjectId;
  public name: string;
  public email: string;
  public passwordHash: string;
  public gender: UserGender;
  public role: UserRole;
  public location: MetroStation;
  public birthDate?: Date;
  public avatar?: string;
  public friends?: string[];
  public alerts?: IAlert[];
  public registrationDate?: Date;
  public level: UserLevel;
  public trainingType: TrainingType[];
  public trainingDuration: TrainingDuration;
  public caloriesToLose: number;
  public caloriesToLosePerDay: number;
  public description: string;
  public readyToTraining: boolean;
  public favoriteGyms?: number[];
  public nutritionDiaryId?: Types.ObjectId;
  public trainingDiaryId?: Types.ObjectId;
  public balanceId?: Types.ObjectId;
  public clientProgress: IClientProgress;
  public refreshTokenHash: string;

  constructor(user: IClient) {
    this.fillEntity(user);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: IClient) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.gender = user.gender;
    this.role = user.role;
    this.location = user.location;
    this.birthDate = user.birthDate;
    this.avatar = user.avatar;
    this.friends = user.friends;
    this.alerts = user.alerts;
    this.registrationDate = user.registrationDate;
    this.level = user.level;
    this.trainingType = user.trainingType;
    this.trainingDuration = user.trainingDuration;
    this.caloriesToLose = user.caloriesToLose;
    this.caloriesToLosePerDay = user.caloriesToLosePerDay;
    this.description = user.description;
    this.readyToTraining = user.readyToTraining;
    this.favoriteGyms = user.favoriteGyms;
    this.nutritionDiaryId = user.nutritionDiaryId;
    this.trainingDiaryId = user.trainingDiaryId;
    this.balanceId = user.balanceId;
    this.clientProgress = user.clientProgress;
    this.refreshTokenHash = user.refreshTokenHash;
  }

  public async setPassword(password: string): Promise<ClientEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async setRefreshToken(token: string): Promise<ClientEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.refreshTokenHash = await hash(token, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public async compareRefreshToken(token: string): Promise<boolean> {
    return compare(token, this.refreshTokenHash);
  }
}
