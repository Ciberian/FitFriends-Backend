import { State } from '../../types/state';
import { AuthorizationStatus, NameSpace } from '../../app/utils/constants';
import { ITokenPayload } from '../../../../../libs/shared-types/src/lib/token-payload.interface';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: State): ITokenPayload | null => state[NameSpace.User].userInfo;
