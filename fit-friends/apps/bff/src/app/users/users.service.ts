import * as FormData from 'form-data'
import {
  LoginUserDto,
  CreateClientDto,
  UpdateClientDto,
  UpdateTrainerDto,
  CreateTrainerDto,
  RequestToUserDto,
  ChangeFavoriteGymsDto,
  LoggedUserRdo,
  DecreaseClientBalanceDto,
  UpdateTrainingDiaryDto,
  UpdateNutritionDiaryDto,
  RefreshTokenDto,
} from '@fit-friends/core';
import {
  IUser,
  IClient,
  ITrainer,
  IClientBalance,
  ITrainingDiary,
  INutritionDiary,
} from '@fit-friends/shared-types';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { Types } from 'mongoose';
import { AxiosError } from 'axios';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  public async register(newUserDto:  CreateClientDto | CreateTrainerDto) {
    const { data: user } = await firstValueFrom(
      this.httpService
        .post<IClient | IUser>(
          `${this.configService.get('service.users')}/register`,
          newUserDto
        )
        .pipe(catchError(this.handleError))
    )

    return user;
  }

  public async loginUser(dto: LoginUserDto) {
    const { data: user } = await firstValueFrom(
      this.httpService
        .post<LoggedUserRdo>(
          `${this.configService.get('service.users')}/login`,
          dto,
        )
        .pipe(catchError(this.handleError))
    )

    return user;
  }

  public async refresh(userId: Types.ObjectId, dto: RefreshTokenDto) {
    const { data: newTokens } = await firstValueFrom(
      this.httpService
        .post<LoggedUserRdo>(
          `${this.configService.get('service.users')}/${userId}/refresh`,
          dto,
        )
        .pipe(catchError(this.handleError))
    )

    return newTokens;
  }

  public async drop(authHeader: string) {
    const { data: emptyRefreshToken } = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('service.users')}/drop`,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return emptyRefreshToken;
  }

  public async getFriends(authHeader: string) {
    const { data: friends } = await firstValueFrom(
      this.httpService
        .get<(IClient | ITrainer)[]>(
          `${this.configService.get('service.users')}/friends`,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return friends;
  }

  public async reqFriendship(dto: RequestToUserDto, authHeader: string) {
    const { data: friends } = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('service.users')}/friends/req`,
          dto,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return friends;
  }

  public async accFriendship(dto: RequestToUserDto, authHeader: string) {
    const { data: friends } = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('service.users')}/friends/accept`,
          dto,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return friends;
  }

  public async rejFriendship(dto: RequestToUserDto, authHeader: string) {
    const { data: friends } = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('service.users')}/friends/reject`,
          dto,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return friends;
  }

  public async delFriend(dto: RequestToUserDto, authHeader: string) {
    const { data: friends } = await firstValueFrom(
      this.httpService
        .delete(
          `${this.configService.get('service.users')}/friends/delete`,
          {
            data: dto,
            headers: { authorization: authHeader }
          }
        )
        .pipe(catchError(this.handleError))
    )

    return friends;
  }

  public async delAlerts(authHeader: string) {
    const { data: user } = await firstValueFrom(
      this.httpService
        .delete(
          `${this.configService.get('service.users')}/friends/delete`,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return user;
  }

  public async reqPersonalTraining(dto: RequestToUserDto, authHeader: string) {
    const { data: trainings } = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('service.users')}/personal-training/req`,
          dto,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return trainings;
  }

  public async accPersonalTraining(dto: RequestToUserDto, authHeader: string) {
    const { data: trainings } = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('service.users')}/personal-training/accept`,
          dto,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return trainings;
  }

  public async rejPersonalTraining(dto: RequestToUserDto, authHeader: string) {
    const { data: trainings } = await firstValueFrom(
      this.httpService
        .post(
          `${this.configService.get('service.users')}/personal-training/reject`,
          dto,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return trainings;
  }

  public async getUser(id: Types.ObjectId, authHeader: string) {
    const { data: user } = await firstValueFrom(
      this.httpService
        .get<(IClient | ITrainer)>(
          `${this.configService.get('service.users')}/user/${id}`,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return user;
  }

  public async getUsers(query: string, authHeader: string) {
    const { data: users } = await firstValueFrom(
      this.httpService
        .get<(IClient | ITrainer)[]>(
          `${this.configService.get('service.users')}/${query ? `?${query}` : ''}`,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return users;
  }

  public async updateUser(dto: UpdateClientDto | UpdateTrainerDto, authHeader: string) {
    const { data: updatedUser } = await firstValueFrom(
      this.httpService
        .patch<(IClient | ITrainer)>(
          `${this.configService.get('service.users')}`,
          dto,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return updatedUser;
  }

  public async addGymToList(dto: ChangeFavoriteGymsDto, authHeader: string) {
    const { data: gyms } = await firstValueFrom(
      this.httpService
        .patch<(IClient | ITrainer)>(
          `${this.configService.get('service.users')}/favorite-gyms/add`,
          dto,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return gyms;
  }

  public async delGymFromList(dto: ChangeFavoriteGymsDto, authHeader: string) {
    const { data: gyms } = await firstValueFrom(
      this.httpService
        .patch<(IClient | ITrainer)>(
          `${this.configService.get('service.users')}/favorite-gyms/del`,
          dto,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    )

    return gyms;
  }

  public async getClientBalance(authHeader: string) {
    const { data: clientBalance } = await firstValueFrom(
      this.httpService
        .get<(IClientBalance)>(
          `${this.configService.get('service.users')}/client-balance`,
          { headers: { authorization: authHeader }}
        )
        .pipe(catchError(this.handleError))
    );

    const gymIds = {
      gymsOnUserBalance: clientBalance.gyms.map((gym) => gym.gymId),
    };

    const { data: gyms } = await firstValueFrom(
      this.httpService
        .get<(IClientBalance)>(
          `${this.configService.get('service.gyms')}/on-balance`,
          {
            data: gymIds,
            headers: { authorization: authHeader }
          }
        )
        .pipe(catchError(this.handleError))
    );

    const trainingIds = {
      gymsOnUserBalance: clientBalance.trainings.map((training) => training.trainingId),
    };

    const { data: trainings } = await firstValueFrom(
      this.httpService
        .get<(IClientBalance)>(
          `${this.configService.get('service.trainings')}/on-balance`,
          {
            data: trainingIds,
            headers: { authorization: authHeader }
          }
        )
        .pipe(catchError(this.handleError))
    );

    return { clientBalance, gyms, trainings };
  }

  public async changeBalanceAndTrainingDiary(
    dto: DecreaseClientBalanceDto | UpdateTrainingDiaryDto,
    authHeader: string
  ) {

    const { data: clientBalance } = await firstValueFrom(
      this.httpService
        .post<(IClientBalance)>(
          `${this.configService.get('service.users')}/client-balance/dec`,
          { trainingId: (dto as DecreaseClientBalanceDto).trainingId },
          { headers: { authorization: authHeader } }
        )
        .pipe(catchError(this.handleError))
    )

    const { data: trainingDairy } = await firstValueFrom(
      this.httpService
        .patch<(IClientBalance)>(
          `${this.configService.get('service.trainings')}/training-diary`,
          {
            trainingTitle: (dto as UpdateTrainingDiaryDto).trainingTitle,
            calories: (dto as UpdateTrainingDiaryDto).calories,
            duration: (dto as UpdateTrainingDiaryDto).duration,
          },
          { headers: { authorization: authHeader } }
        )
        .pipe(catchError(this.handleError))
    )

    return { clientBalance, trainingDairy };
  }

  public async getNutritionDiary(authHeader: string) {
    const { data: nutritionDiary } = await firstValueFrom(
      this.httpService
        .get<(INutritionDiary)>(
          `${this.configService.get('service.users')}/nutrition-diary`,
          { headers: { authorization: authHeader } }
        )
        .pipe(catchError(this.handleError))
    )

    return nutritionDiary;
  }

  public async changeNutritionDiary(dto: UpdateNutritionDiaryDto, authHeader: string) {
    const { data: nutritionDiary } = await firstValueFrom(
      this.httpService
        .patch<(INutritionDiary)>(
          `${this.configService.get('service.users')}/nutrition-diary`,
          dto,
          { headers: { authorization: authHeader } }
        )
        .pipe(catchError(this.handleError))
    )

    return nutritionDiary;
  }

  public async getTrainingDiary(authHeader: string) {
    const { data: trainingDiary } = await firstValueFrom(
      this.httpService
        .get<(ITrainingDiary)>(
          `${this.configService.get('service.users')}/training-diary`,
          { headers: { authorization: authHeader } }
        )
        .pipe(catchError(this.handleError))
    )

    return trainingDiary;
  }

  public async uploadImage(file: Express.Multer.File) {
    const form = new FormData();
    form.append('avatar', file.buffer, file.originalname);

    return this.httpService
      .post<IClient | ITrainer>(
        `${this.configService.get('services.users')}/avatar`,
        form,
        {
          headers: {
            ...form.getHeaders(),
          },
        }
      )
      .pipe(catchError(this.handleError))
  }

  private handleError = (error: AxiosError) => {
    this.logger.error(error.response.data);
    throw new InternalServerErrorException({
      cause: error,
    });
  };
}
