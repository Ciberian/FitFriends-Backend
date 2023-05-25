import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveAccessToken, saveRefreshToken } from '../app/services/tokens.service';
import { APIRoute } from '../app/utils/constants';
import { ITraining } from '../../../../libs/shared-types/src/lib/training.interface';
import { IGym } from '../../../../libs/shared-types/src/lib/gym.interface';
import { AppDispatch, AuthData, LoggedUserData, State } from '../types/state';
import { CreateTrainerDto } from '../../../../libs/core/src/lib/dto/users-dto/create-trainer.dto';
import { CreateClientDto } from '../../../../libs/core/src/lib/dto/users-dto/create-client.dto';

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
  saveAccessToken(data.accessToken);
  saveRefreshToken(data.refreshToken);

  return data;
});

export const registerTrainerAction = createAsyncThunk<
  LoggedUserData,
  CreateTrainerDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/registerTrainer', async (CreateTrainerDto, { extra: api }) => {
  const { data } = await api.post<LoggedUserData>(`${APIRoute.Users}/register`, CreateTrainerDto);

  return data;
});

export const registerClientAction = createAsyncThunk<
  LoggedUserData,
  CreateClientDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/registerClient', async (CreateClientDto, { extra: api }) => {
  const { data } = await api.post<LoggedUserData>(`${APIRoute.Users}/register`, CreateClientDto);

  return data;
});
