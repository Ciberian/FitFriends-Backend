import { store } from '../store/index.js';
import { AuthorizationStatus } from '../app/utils/constants.js';
import { ITraining } from '../../../../libs/shared-types/src/lib/training.interface.js';
import { IGym } from '../../../../libs/shared-types/src/lib/gym.interface.js';

export type CurrentError = {
  error: null | string;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userInfo: null | LoggedUserData;
};

export type GymsData = {
  gyms: IGym[];
  isDataLoaded: boolean;
};

export type TrainingsData = {
  trainings: ITraining[];
  isDataLoaded: boolean;
};

export type AuthData = {
  login: string;
  password: string;
};

export type LoggedUserData = {
  id: number;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
