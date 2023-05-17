import { NameSpace } from '../../app/utils/constants';
import { State } from '../../types/state';

export const getCurrentError = (state: State): string | null => state[NameSpace.Error].error;
