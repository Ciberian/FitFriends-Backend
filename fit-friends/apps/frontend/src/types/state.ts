import { store } from '../store/index.js';
import { AuthorizationStatus } from '../app/utils/constants.js';
import { ITokenPayload } from '../../../../libs/shared-types/src/lib/token-payload.interface.js';

export type CurrentError = {
  error: null | string;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userInfo: null | ITokenPayload,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
