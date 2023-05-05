import { Types } from 'mongoose';
import { UserRole } from './enums/user-role.enum';

export interface ITokenPayload {
  id: Types.ObjectId;
  email: string;
  role: UserRole;
  name: string;
  avatar: string;
  favoriteGyms: number[];
}
