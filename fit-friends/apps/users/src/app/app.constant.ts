import {
  MetroStation,
  OrderType,
  TrainingDuration,
  TrainingType,
  UserGender,
  UserLevel,
  UserRole,
} from '@fit-friends/shared-types';
import { Types } from 'mongoose';

export const ENV_FILE_PATH = 'environments/.users.env';
export const DEFAULT_MONGO_DB_PORT = 27019;
export const SALT_ROUNDS = 10;
export const MAX_SPECIALIZATIONS_COUNT = 5;
export const DEFAULT_PAGE = 1;
export const USERS_COLLECTIONS_COUNT = 2;
export const UnchangeableUserProperties = [
  'email',
  'password',
  'passwordHash',
  'role',
  'friends',
  'registrationDate',
  'refreshTokenHash',
  'favoriteGyms',
  'nutritionDiaryId',
  'trainingDiaryId',
  'balanceId',
  'clientProgress',
  'alerts',
];

export const User = {
  DefaultCountLimit: 50,
  DefaultSortDirection: 'desc',
  DefaultSortType: 'registrationDate',
} as const;

export enum FavoriteGymsAction {
  Add = 'add',
  Delete = 'delete',
}

export enum UserName {
  MinLength = 1,
  MaxLength = 15,
}

export enum TokenExpire {
  Access = 60 * 15,
  Refresh = 60 * 60 * 24 * 7,
}

export enum AuthErrorMessage {
  UserAlreadyExist = 'User with this email exists',
  UserNotFound = 'User with this email/id not found',
  UserPasswordWrong = 'User password is wrong',
  RefreshTokenNotValid = 'Refresh token is not valid',
  WrongAccessToken = 'Wrong access-token or expired',
  ActionNotAllowed = 'User can update only his own data',
  UsersCountExceeded = 'The number of users cannot be more than 50',
  UpdateForbiddenProperties = 'Email, password, role and some others cannot be updated',
  WrongUserRole = 'Only a user with the Client role has access to this action',
  TrainingNotFound = "The training with the specified ID is not on the user's balance",
  AlreadyRequested = 'Friendship already requested',
  AlreadyHaveFriend = 'The user is already your friend',
  AlreadyReqTraining = 'The personal training is already requested',
  NotFriend = 'Personal training request allowed only for friends',
  NoPersonalTraining = 'The current trainer does not provide personal training',
  NotReadyToTraining = 'The current user is not ready to training',
  DontHaveFriend = "Don't have user with this ID in friends list",
  CantAcceptFriend = "Can't accept friendship from user, who didn't request it",
  CantAcceptTraining = "Can't accept personal training from user, who didn't request it",
  CantRejectFriend = "Can't reject friendship from user, who is your friend",
  CantRejectUser = "Can't reject user, who did't request friendship",
  GymAlreadyFavorite = 'The gym is already in favorite list',
  GymNotFavorite = 'The gym is not in favorite list',
  SameId = 'Requestor ID and respondend ID are the same',
}

export const MOCK_ID_1 = new Types.ObjectId('64492fb4d9b7e51ccd8ea001');
export const MOCK_ID_2 = new Types.ObjectId('638348b04f5f6091439ea002');
export const MOCK_ID_3 = '64492fb4d9b7e51ccd8ea001';

export const MockAdditionalUserData = {
  balanceId: undefined,
  clientProgress: undefined,
  nutritionDiaryId: undefined,
  trainingDiaryId: undefined,
};

export const UsersTest = {
  User: {
    id: MOCK_ID_1,
    email: 'my@mail.com',
    name: 'Alex',
    avatar: 'avatar.png',
    role: UserRole.Client,
    favoriteGyms: [1],
  },
  ClientDto: {
    name: 'Bob',
    email: 'client-test@gmail.com',
    password: 'abcdefg',
    gender: UserGender.Male,
    role: UserRole.Client,
    location: MetroStation.Petrogradskaya,
    birthDate: new Date('2003-02-02'),
    level: UserLevel.Newbie,
    trainingType: TrainingType.Boxing,
    trainingDuration: TrainingDuration.LessHalfHour,
    caloriesToLose: 2000,
    caloriesToLosePerDay: 4000,
    description:
      'Привет! Я Bob и мне 20 лет. Обожаю спорт и все, что с ним связанно.',
    readyToTraining: true,
  },
  ClientResult: {
    name: 'Bob',
    email: 'client-test@gmail.com',
    gender: UserGender.Male,
    role: UserRole.Client,
    location: MetroStation.Petrogradskaya,
    birthDate: '2003-02-02',
    avatar: 'My_avatar.png',
    friends: [],
    level: UserLevel.Newbie,
    trainingType: TrainingType.Boxing,
    trainingDuration: TrainingDuration.LessHalfHour,
    caloriesToLose: 2000,
    caloriesToLosePerDay: 4000,
    description:
      'Привет! Я Bob и мне 20 лет. Обожаю спорт и все, что с ним связанно.',
    readyToTraining: true,
    favoriteGyms: [1, 2, 3],
    registrationDate: '2023-04-25T14:07:27.554Z',
    alerts: [],
  },
  LoginResult: {
    email: 'client-test@gmail.com',
    accessToken: undefined,
    refreshToken: undefined,
  },
  ClientBalanceDto: {
    type: OrderType.Training,
    serviceId: 3,
    quantity: 33
  },
  ClientBalanceResult: {
    trainings: [{
      trainingId: 12,
      availableTrainingsCount: 10,
    }, {
      trainingId: 34,
      availableTrainingsCount: 20,
    }],
    gyms: [{
      gymId: 56,
      seasonPassCount: 30,
    }, {
      gymId: 78,
      seasonPassCount: 40,
    }]
  },
  TrainingDiaryDto: {
    trainingTitle: "Box",
    calories: 1800,
    duration: TrainingDuration.LessAnHour,
  }
};

export const DEFAULT_NUTRITION_DIARY = {
  mon: {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
    totalCaloriesPerDay: 0,
    date: new Date(),
  },
  tue: {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
    totalCaloriesPerDay: 0,
    date: new Date(),
  },
  wed: {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
    totalCaloriesPerDay: 0,
    date: new Date(),
  },
  thu: {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
    totalCaloriesPerDay: 0,
    date: new Date(),
  },
  fri: {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
    totalCaloriesPerDay: 0,
    date: new Date(),
  },
  sat: {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
    totalCaloriesPerDay: 0,
    date: new Date(),
  },
  sun: {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0,
    totalCaloriesPerDay: 0,
    date: new Date(),
  },
  totalCaloriesPerWeek: 0,
};

export const DEFAULT_TRAINING_DIARY = {
  mon: { trainings: [], totalCaloriesPerDay: 0, date: new Date() },
  tue: { trainings: [], totalCaloriesPerDay: 0, date: new Date() },
  wed: { trainings: [], totalCaloriesPerDay: 0, date: new Date() },
  thu: { trainings: [], totalCaloriesPerDay: 0, date: new Date() },
  fri: { trainings: [], totalCaloriesPerDay: 0, date: new Date() },
  sat: { trainings: [], totalCaloriesPerDay: 0, date: new Date() },
  sun: { trainings: [], totalCaloriesPerDay: 0, date: new Date() },
  totalCaloriesPerWeek: 0,
}

export const DEFAULT_CLIENT_PROGRESS = {
  mon: {
    caloriesConsumed: 0,
    caloriesSpent: 0,
    result: 0,
    date: new Date(),
  },
  tue: {
    caloriesConsumed: 0,
    caloriesSpent: 0,
    result: 0,
    date: new Date(),
  },
  wed: {
    caloriesConsumed: 0,
    caloriesSpent: 0,
    result: 0,
    date: new Date(),
  },
  thu: {
    caloriesConsumed: 0,
    caloriesSpent: 0,
    result: 0,
    date: new Date(),
  },
  fri: {
    caloriesConsumed: 0,
    caloriesSpent: 0,
    result: 0,
    date: new Date(),
  },
  sat: {
    caloriesConsumed: 0,
    caloriesSpent: 0,
    result: 0,
    date: new Date(),
  },
  sun: {
    caloriesConsumed: 0,
    caloriesSpent: 0,
    result: 0,
    date: new Date(),
  },
};
