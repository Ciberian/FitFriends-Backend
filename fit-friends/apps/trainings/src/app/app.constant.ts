import { Types } from 'mongoose';
import { OrderType, PaymentMethod, TrainingDuration, TrainingType, UserGender, UserLevel, UserRole } from '@fit-friends/shared-types';

export const ENV_FILE_PATH = 'environments/.trainings.env';
export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
export const DEFAULT_RABBIT_PORT = 5672;
export const DEFAULT_PAGE = 1;

export const TrainingQueryValue = {
  DefaultCountLimit: 50,
  DefaultSortDirection: 'desc',
  DefaultSortType: 'registerDate',
  DefaultMinPrice: 0,
  DefaultMaxPrice: 1000000,
  DefaultMinCalories: 0,
  DefaultMaxCalories: 5000,
} as const;

export enum OrderQueryValue {
  DefaultSortDirection = 'desc',
}

export enum TrainingErrorMessage {
  WrongUserRole = 'Only a user with the Trainer role can create/update training',
  WrongUserId = 'User can change only his own training',
  ActionNotAllowed = 'The action is allowed - wrong user role',
}

export enum OrderErrorMessage {
  WrongUserRole = 'Only a user with the Client role can access to this action',
  AccessDenied = 'Only a user with the Trainer role can get trainings'
}

export const TrainingsTest = {
  User: {
    id: new Types.ObjectId('64492fb4d9b7e51ccd8f1e43'),
    email: 'my@mail.com',
    name: 'Alex',
    avatar: 'avatar.png',
    role: UserRole.Client,
    favoriteGyms: [1],
  },
  OrderResult: {
    id: 1,
    type: "Тренировка",
    serviceId: 8,
    price: 888,
    quantity: 9,
    totalPrice: 7992,
    paymentMethod: "Visa",
    creationDate: new Date().toISOString(),
  },
  OrderDto: {
    type: OrderType.Training,
    serviceId: 8,
    trainerId: "642fb78e3643da39441b9e3c",
    price: 888,
    quantity: 9,
    paymentMethod: 'Visa' as PaymentMethod,
  },
  ReviewDto: {
    trainingId: 1,
    rating: 3,
    comment: 'Эта тренировка для меня зарядка по утрам, помогает проснуться.'
  },
  ReviewResult: {
    authorName: 'Kate',
    authorAvatar: 'avatar.png',
    trainingId: 1,
    rating: 3,
    comment: 'Эта тренировка для меня зарядка по утрам, помогает проснуться.',
    creationDate: new Date().toISOString(),
  },
  TrainingDto: {
    title: "Power",
    image: "power.png",
    level: UserLevel.Professional,
    type: TrainingType.Crossfit,
    duration: TrainingDuration.LessAnHour,
    gender: UserGender.Male,
    caloriesToLose: 4130,
    description: "Тренировка на отработку правильной техники работы с тяжелыми весами.",
    video: "power.mp4",
    price: 13000,
    isSpecialOffer: true
  },
  TrainingResult: {
    id: 1,
    title: "Power",
    image: "power.png",
    level: "Профессионал",
    type: "Бокс",
    duration: "50-80 мин",
    gender: "Мужчина",
    caloriesToLose: 4130,
    description: "Тренировка на отработку правильной техники работы с тяжелыми весами.",
    video: "power.mp4",
    price: 13000,
    rating: 4.4,
    trainer: '64492fb4d9b7e51ccd8f1e43',
    isSpecialOffer: true
  },
};
