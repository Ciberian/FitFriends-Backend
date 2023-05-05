import dayjs = require('dayjs');
import {
  fillDTO,
  getTodayWeekday,
  TrainingDiaryRdo,
  UpdateTrainingDiaryDto,
} from '@fit-friends/core';
import {
  IClient,
  ITrainingDiary,
  TrainingData,
  UserRole
} from '@fit-friends/shared-types';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ClientRepository } from '../client/client.repository';
import { TrainingDiaryRepository } from './training-diary.repository';
import { AuthErrorMessage } from '../app.constant';
import { Types } from 'mongoose';

@Injectable()
export class TrainingDiaryService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly trainingDiaryRepository: TrainingDiaryRepository,
  ) {}

  public async getTrainingDiary(userId: Types.ObjectId, userRole: UserRole) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(AuthErrorMessage.WrongUserRole);
    }

    const { trainingDiaryId } = await this.clientRepository.findById(userId);
    const trainingDiary = await this.trainingDiaryRepository.findById(trainingDiaryId);
    const weekDay = getTodayWeekday();

    if (weekDay === 'mon' &&
      dayjs(trainingDiary.mon.date).format('D MMMM') !== dayjs(new Date()).format('D MMMM')
    ) {
      return this.resetTrainingDiary(trainingDiaryId);
    }

    return trainingDiary;
  }

  public async changeTrainingDiary(userId: Types.ObjectId, userRole: UserRole, dto: UpdateTrainingDiaryDto) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(AuthErrorMessage.WrongUserRole);
    }

    const client = await this.clientRepository.findById(userId);
    const trainingDiary = fillDTO(TrainingDiaryRdo, await this.trainingDiaryRepository.findById(client.trainingDiaryId));
    const weekDay = getTodayWeekday();
    trainingDiary[weekDay].trainings.push(dto);
    trainingDiary[weekDay].totalCaloriesPerDay = trainingDiary[weekDay].trainings.reduce((sum: number, item: TrainingData) => sum + item.calories, 0);
    trainingDiary.totalCaloriesPerWeek = Object.values(trainingDiary)
      .slice(1, -1)
      .reduce((sum: number, item) => sum + item.totalCaloriesPerDay, 0);
    trainingDiary[weekDay].date = dayjs(new Date()).toDate();

    this.updateClientSpentCalories(client, weekDay, trainingDiary[weekDay].totalCaloriesPerDay);

    return this.trainingDiaryRepository.update(client.trainingDiaryId, trainingDiary);
  }

  private async resetTrainingDiary(oldId: Types.ObjectId): Promise<ITrainingDiary> {
    const newTrainingDiary = fillDTO(TrainingDiaryRdo, await this.trainingDiaryRepository.create());
    delete newTrainingDiary.id;

    return this.trainingDiaryRepository.update(oldId, newTrainingDiary);
  }

  private async updateClientSpentCalories(user: IClient, weekDay: string, caloriesSpent: number): Promise<void> {
    user.clientProgress[weekDay].caloriesSpent = caloriesSpent;
    user.clientProgress[weekDay].result = user.clientProgress[weekDay].caloriesConsumed - user.clientProgress[weekDay].caloriesSpent;
    user.clientProgress[weekDay].date = new Date;

    this.clientRepository.update(user._id, user);
  }
}
