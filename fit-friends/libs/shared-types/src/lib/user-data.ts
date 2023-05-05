import { IClient } from './client.interface';
import { UserRole } from './enums/user-role.enum';
import { ITrainer } from './trainer.interface';
import { IUser } from './user.interface';

type UserData = Omit<IUser, 'passwordHash'> & { password: string };

export type UserExtendedType<T extends UserRole> = UserData &
  { role: T } &
  (T extends UserRole.Trainer ? ITrainer : IClient);
