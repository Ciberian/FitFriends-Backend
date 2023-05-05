import { Types } from 'mongoose';
import { UserRole } from '@fit-friends/shared-types';

export const ENV_FILE_PATH = 'environments/.gyms.env';
export const DEFAULT_PAGE = 1;

export const GymsQueryDefaultValue = {
  CountLimit: 50,
  SortDirection: 'desc',
  SortType: 'registerDate',
} as const;

export enum GymErrorMessage {
  WrongUserRole = 'Only a user with the Client role has access to this action',
}

export const GymsTest = {
  Result: {
    id: 1,
    title: 'Grand fitness',
    location: 'Пионерская',
    isVerified: true,
    gymFeatures: ['Бассейн', 'Массаж'],
    photos: ['photo1.png', 'photo2.png'],
    description: 'Спортивный комплекс премиум-класса с 3 видами сауны, бассейном длинной 54 м., услугами массажиста и большой парковкой.',
    price: 750,
    registerDate: new Date(),
  },
  User: {
    id: new Types.ObjectId('64492fb4d9b7e51ccd8f1e43'),
    email: '',
    name: '',
    avatar: '',
    role: UserRole.Client,
    favoriteGyms: [1],
  }
};
