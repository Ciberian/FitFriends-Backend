import { State } from '../../types/state';
import { NameSpace } from '../../app/utils/constants';
import { ITraining } from '../../../../../libs/shared-types/src/lib/training.interface';

export const getTrainings = (state: State): ITraining[] => state[NameSpace.Trainings].trainings;
export const getLoadedTrainingsStatus = (state: State): boolean => state[NameSpace.Trainings].isDataLoaded;
