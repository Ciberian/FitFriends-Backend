import { userProcess } from './user-process';
import { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../app/utils/constants';
import { checkAuthAction, loginAction } from '../api-actions';
import { makeFakeUserInfo } from '../../app/utils/mocks';

const userInfo = makeFakeUserInfo();

describe('Reducer: userProcess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {authorizationStatus: AuthorizationStatus.Unknown, userInfo: null};
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown, userInfo: null});
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and userInfo if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type, payload: userInfo}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userInfo: userInfo});
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" and userInfo if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: userInfo }))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userInfo: userInfo});
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null});
    });
  });
});
