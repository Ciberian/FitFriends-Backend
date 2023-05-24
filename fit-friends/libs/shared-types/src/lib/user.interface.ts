import { Types } from 'mongoose';
import { MetroStation } from './enums/metro-station.enum';
import { UserGender } from './enums/user-gender.enum';
import { UserRole } from './enums/user-role.enum';
import { IAlert } from './alert.interface';

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  passwordHash?: string;
  gender: UserGender;
  role: UserRole;
  location: MetroStation;
  birthDate?: Date;
  avatar?: string;
  friends?: string[];
  alerts?: IAlert[];
  registrationDate?: Date;
  refreshTokenHash?: string;
}
