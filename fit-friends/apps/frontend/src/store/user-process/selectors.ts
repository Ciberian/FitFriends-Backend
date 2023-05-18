import { LoggedUserData, State } from '../../types/state';
import { AuthorizationStatus, NameSpace } from '../../app/utils/constants';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: State): LoggedUserData | null => state[NameSpace.User].userInfo;
