import dayjs = require('dayjs');
import {
  fillDTO,
  getTodayWeekday,
  NutritionDiaryRdo,
  UpdateNutritionDiaryDto,
} from '@fit-friends/core';
import {
  IClient,
  INutritionDiary,
  NutritionData,
  UserRole
} from '@fit-friends/shared-types';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { NutritionDiaryRepository } from './nutrition-diary.repository';
import { ClientRepository } from '../client/client.repository';
import { AuthErrorMessage, DATE_FORMAT, WeekDay } from '../app.constant';
import { Types } from 'mongoose';

@Injectable()
export class NutritionDiaryService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly nutritionDiaryRepository: NutritionDiaryRepository,
  ) {}

  public async getNutritionDiary(userId: Types.ObjectId, userRole: UserRole) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(AuthErrorMessage.WrongUserRole);
    }

    const { nutritionDiaryId } = await this.clientRepository.findById(userId);
    const nutritionDiary = await this.nutritionDiaryRepository.findById(nutritionDiaryId);
    const weekDay = getTodayWeekday();

    if (weekDay === WeekDay.Monday &&
      dayjs(nutritionDiary.mon.date).format(DATE_FORMAT) !== dayjs(new Date()).format(DATE_FORMAT)
    ) {
      return this.resetNutritionDiary(nutritionDiaryId);
    }

    return nutritionDiary;
  }

  public async changeNutritionDiary(userId: Types.ObjectId, userRole: UserRole, dto: UpdateNutritionDiaryDto) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(AuthErrorMessage.WrongUserRole);
    }

    const client = await this.clientRepository.findById(userId);
    const nutritionDiary = fillDTO(NutritionDiaryRdo, await this.nutritionDiaryRepository.findById(client.nutritionDiaryId));
    const weekDay = getTodayWeekday();
    const updatedNutritionDiary = { ...nutritionDiary, [weekDay]: { ...nutritionDiary[weekDay], ...dto } };
    updatedNutritionDiary[weekDay].totalCaloriesPerDay = Object.values(updatedNutritionDiary[weekDay])
      .slice(0, -2)
      .reduce((sum: number, value: number) => sum + value, 0);
    updatedNutritionDiary[weekDay].date = dayjs(new Date()).toDate();
    const caloriesPerWeek = Object.values(updatedNutritionDiary)
      .slice(1, -1)
      .reduce((sum: number, item: NutritionData) => sum + item.totalCaloriesPerDay, 0);
    updatedNutritionDiary.totalCaloriesPerWeek = caloriesPerWeek as number;

    this.updateClientConsumedCalories(client, weekDay, updatedNutritionDiary[weekDay].totalCaloriesPerDay);

    return this.nutritionDiaryRepository.update(client.nutritionDiaryId, updatedNutritionDiary);
  }

  private async resetNutritionDiary(oldId: Types.ObjectId): Promise<INutritionDiary> {
    const newNutritionDiary = fillDTO(NutritionDiaryRdo, await this.nutritionDiaryRepository.create());
    delete newNutritionDiary.id;

    return this.nutritionDiaryRepository.update(oldId, newNutritionDiary);
  }

  private async updateClientConsumedCalories(user: IClient, weekDay: string, caloriesConsumed: number): Promise<void> {
    user.clientProgress[weekDay].caloriesConsumed = caloriesConsumed;
    user.clientProgress[weekDay].result = user.clientProgress[weekDay].caloriesConsumed - user.clientProgress[weekDay].caloriesSpent;
    user.clientProgress[weekDay].date = new Date;

    this.clientRepository.update(user._id, user);
  }
}
