import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../app/utils/constants';
import { gymsData } from './gyms-data/gyms-data';
import { trainingsData } from './trainings-data/trainings-data';
import { userProcess } from './user-process/user-process';
import { errorProcess } from './error-process/error-process';

export const rootReducer = combineReducers({
  [NameSpace.Gyms]: gymsData.reducer,
  [NameSpace.Trainings]: trainingsData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Error]: errorProcess.reducer,
});
