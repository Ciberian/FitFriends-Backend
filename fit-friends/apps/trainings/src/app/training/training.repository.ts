import { Injectable } from '@nestjs/common';
import { ICRUDRepository } from '@fit-friends/core';
import { TrainingQuery } from './query/training.query';
import { TrainingEntity } from './training.entity';
import { DEFAULT_PAGE, TrainingQueryValue } from '../app.constant';
import { PrismaService } from '../prisma/prisma.service';
import { Training } from '@prisma/client-trainings';
import { Types } from 'mongoose';

@Injectable()
export class TrainingRepository
  implements ICRUDRepository<TrainingEntity, number, Training>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(training: TrainingEntity): Promise<Training> {
    return this.prisma.training.create({
      data: { ...training.toObject() },
    });
  }

  public async findById(id: number): Promise<Training | null> {
    return this.prisma.training.findFirst({
      where: { id: id },
    });
  }

  public async find({
    page = DEFAULT_PAGE,
    limit = TrainingQueryValue.DefaultCountLimit,
    sortDirection = TrainingQueryValue.DefaultSortDirection,
    sortType = TrainingQueryValue.DefaultSortType,
    rating,
    priceGTE = TrainingQueryValue.DefaultMinPrice,
    priceLTE = TrainingQueryValue.DefaultMaxPrice,
    caloriesGTE = TrainingQueryValue.DefaultMinCalories,
    caloriesLTE = TrainingQueryValue.DefaultMaxCalories,
    duration,
  }: TrainingQuery): Promise<Training[]> {
    if (rating) {
      return this.prisma.training.findMany({
        where: {
          AND: [
            { rating: rating },
            { price: { gte: priceGTE, lte: priceLTE } },
            { caloriesToLose: { gte: caloriesGTE, lte: caloriesLTE } },
          ],
        },
        take: limit,
        skip: page > 0 ? limit * (page - 1) : undefined,
        orderBy: { [sortType]: sortDirection },
      });
    }

    if (duration) {
      return this.prisma.training.findMany({
        where: {
          AND: [
            { price: { gte: priceGTE, lte: priceLTE } },
            { caloriesToLose: { gte: caloriesGTE, lte: caloriesLTE } },
            { duration: duration },
          ],
        },
      });
    }

    if (rating && duration) {
      return this.prisma.training.findMany({
        where: {
          AND: [
            { rating: rating },
            { price: { gte: priceGTE, lte: priceLTE } },
            { caloriesToLose: { gte: caloriesGTE, lte: caloriesLTE } },
            { duration: duration },
          ],
        },
      });
    }

    return this.prisma.training.findMany({
      where: {
        AND: [
          { price: { gte: priceGTE, lte: priceLTE } },
          { caloriesToLose: { gte: caloriesGTE, lte: caloriesLTE } },
        ],
      },
    });
  }

  public async findPersonal(
    {
      page = DEFAULT_PAGE,
      limit = TrainingQueryValue.DefaultCountLimit,
      sortDirection = TrainingQueryValue.DefaultSortDirection,
      sortType = TrainingQueryValue.DefaultSortType,
      rating,
      priceGTE = TrainingQueryValue.DefaultMinPrice,
      priceLTE = TrainingQueryValue.DefaultMaxPrice,
      caloriesGTE = TrainingQueryValue.DefaultMinCalories,
      caloriesLTE = TrainingQueryValue.DefaultMaxCalories,
      duration,
    }: TrainingQuery,
    trainerId: Types.ObjectId
  ): Promise<Training[]> {
    if (rating) {
      return this.prisma.training.findMany({
        where: {
          AND: [
            { trainer: String(trainerId) },
            { rating: rating },
            { price: { gte: priceGTE, lte: priceLTE } },
            { caloriesToLose: { gte: caloriesGTE, lte: caloriesLTE } },
          ],
        },
        take: limit,
        skip: page > 0 ? limit * (page - 1) : undefined,
        orderBy: { [sortType]: sortDirection },
      });
    }

    if (duration) {
      return this.prisma.training.findMany({
        where: {
          AND: [
            { trainer: String(trainerId) },
            { price: { gte: priceGTE, lte: priceLTE } },
            { caloriesToLose: { gte: caloriesGTE, lte: caloriesLTE } },
            { duration: duration },
          ],
        },
      });
    }

    if (rating && duration) {
      return this.prisma.training.findMany({
        where: {
          AND: [
            { trainer: String(trainerId) },
            { rating: rating },
            { price: { gte: priceGTE, lte: priceLTE } },
            { caloriesToLose: { gte: caloriesGTE, lte: caloriesLTE } },
            { duration: duration },
          ],
        },
      });
    }

    return this.prisma.training.findMany({
      where: {
        trainer: String(trainerId) ,
        price: { gte: priceGTE, lte: priceLTE },
        caloriesToLose: { gte: caloriesGTE, lte: caloriesLTE },
      },
    });
  }

  public async findUserTrainings(trainingIds: number[]): Promise<Training[]> {
    return this.prisma.training.findMany({
      where: { id: { in: trainingIds } },
      orderBy: {
        [TrainingQueryValue.DefaultSortType]: TrainingQueryValue.DefaultSortDirection,
      },
    });
  }

  public async update(id: number, item: TrainingEntity): Promise<Training> {
    return this.prisma.training.update({
      where: { id: id },
      data: { ...item },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.training.delete({
      where: { id },
    });
  }
}
