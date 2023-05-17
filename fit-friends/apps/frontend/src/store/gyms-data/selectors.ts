import { State } from '../../types/state';
import { NameSpace } from '../../app/utils/constants';
import { IGym } from '../../../../../libs/shared-types/src/lib/gym.interface';

export const getGyms = (state: State): IGym[] => state[NameSpace.Gyms].gyms;
export const getLoadedGymsStatus = (state: State): boolean => state[NameSpace.Gyms].isDataLoaded;
