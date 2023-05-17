import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken } from '../app/services/token';
import { APIRoute } from '../app/utils/constants';
import { ITraining } from '../../../../libs/shared-types/src/lib/training.interface';
import { IGym } from '../../../../libs/shared-types/src/lib/gym.interface';
import { AppDispatch, AuthData, LoggedUserData, State } from '../types/state';

export const fetchGymsAction = createAsyncThunk<
  IGym[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('loadGyms', async (_arg, { extra: api }) => {
  const { data } = await api.get<IGym[]>(APIRoute.Gyms);
  return data;
});

export const fetchTrainingsAction = createAsyncThunk<
  ITraining[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('loadTrainings', async (_arg, { extra: api }) => {
  const { data } = await api.get<ITraining[]>(APIRoute.Trainings);
  return data;
});

export const checkAuthAction = createAsyncThunk<
  LoggedUserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get(`${APIRoute.Users}/login`);
  return data;
});

export const loginAction = createAsyncThunk<
  LoggedUserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ login: email, password }, { extra: api }) => {
  const { data } = await api.post<LoggedUserData>(`${APIRoute.Users}/login`, {
    email,
    password,
  });
  saveToken(data.accessToken);
  return data;
});
