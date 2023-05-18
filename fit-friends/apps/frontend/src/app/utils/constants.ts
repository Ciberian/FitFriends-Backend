export enum ResponseValue {
  Sent = 'отправлен',
  Accepted = 'принят',
  Rejected = 'отклонён',
}

export enum AppRoute {
  Root = '/',
  Intro = '/intro',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  QuestionnaireClient = '/questionnaire-client',
  QuestionnaireTrainer = '/questionnaire-trainer',

  TrainerPersonalAccount = 'trainer-personal-account',
  CreateTraining = 'create-training',
  MyTrainings = 'my-trainings',
  MyOrders = 'my-orders',
  TrainerFriends = 'trainer-friends',
  TrainerTrainingCard = 'trainer-training-card/:id',

  ClientPersonalAccount = 'client-personal-account',
  MyPurchases = 'my-purchases',
  MyGyms = 'my-gyms',
  TrainingDiary = 'training-diary',
  NutritionDiary = 'nutrition-diary',
  ClientFriends = 'client-friends',
  ClientTrainingCard = 'client-training-card/:id',

  GymsCatalog = 'gyms-catalog',
  GymCard = 'gym-card/:id',
  TrainingsCatalog = 'trainings-catalog',
  UsersCatalog = 'users-catalog',
  ClientCard = 'client-card/:id',
  TrainerCard = 'trainer-card/:id',
  NotFound = '/not-found',
}

export enum APIRoute {
  Users = '/users',
  Gyms = '/gyms',
  Trainings = '/trainings',
  Orders = '/orders',
  Reviews = '/reviews',
  Notify = '/notify/subscriber',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Trainings = 'TRAININGS',
  Gyms = 'GYMS',
  User = 'USER',
  Error = 'ERROR',
}

export const CITY = {
  title: 'Санкт-Петербург',
  lat: 59.93863,
  lng: 30.31413,
  zoom: 10,
};

export type CityType = typeof CITY;

export const USER_MAP_PIN = 'assets/img/svg/user-pin.svg';
export const GYM_MAP_PIN = 'assets/img/svg/gym-pin.svg';
