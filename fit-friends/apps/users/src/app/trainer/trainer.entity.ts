import { genSalt, compare, hash } from 'bcrypt';
import { SALT_ROUNDS } from '../app.constant';
import {
  ITrainer,
  MetroStation,
  TrainingType,
  UserLevel,
  UserGender,
  UserRole,
  IAlert,
} from '@fit-friends/shared-types';
import { Types } from 'mongoose';

export class TrainerEntity implements ITrainer {
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
  public trainingType: TrainingType;
  public certificate: string;
  public merits: string;
  public personalTraining: boolean;
  public refreshTokenHash: string;

  constructor(user: ITrainer) {
    this.fillEntity(user);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: ITrainer) {
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
    this.certificate = user.certificate;
    this.merits = user.merits;
    this.personalTraining = user.personalTraining;
    this.refreshTokenHash = user.refreshTokenHash;
  }

  public async setPassword(password: string): Promise<TrainerEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async setRefreshToken(token: string): Promise<TrainerEntity> {
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
