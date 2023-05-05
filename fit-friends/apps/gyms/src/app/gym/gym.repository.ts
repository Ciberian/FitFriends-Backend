import { Injectable } from '@nestjs/common';
import { ICRUDRepository } from '@fit-friends/core';
import { GymEntity } from './gym.entity';
import { GymQuery } from './query/gym.query';
import { DEFAULT_PAGE, GymsQueryDefaultValue } from '../app.constant';
import { PrismaService } from '../prisma/prisma.service';
import { Gym } from '@prisma/client-gyms';

@Injectable()
export class GymRepository implements ICRUDRepository<GymEntity, number, Gym> {
  constructor(private readonly prisma: PrismaService) {}
  create(item: GymEntity): Promise<Gym> {
    console.log(item);
    throw new Error('Method not implemented.');
  }

  public async find({
    limit = GymsQueryDefaultValue.CountLimit,
    page = DEFAULT_PAGE,
    sortDirection = GymsQueryDefaultValue.SortDirection,
    sortType = GymsQueryDefaultValue.SortType,
  }: GymQuery): Promise<Gym[]> {
    return this.prisma.gym.findMany({
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
      orderBy: { [sortType]: sortDirection },
    });
  }

  public async findFavorites(favoriteGyms: number[]): Promise<Gym[]> {
    return this.prisma.gym.findMany({
      where: { id: { in: favoriteGyms } },
      orderBy: {
        [GymsQueryDefaultValue.SortType]: GymsQueryDefaultValue.SortDirection,
      },
    });
  }

  public async findById(id: number): Promise<Gym | null> {
    return this.prisma.gym.findFirst({
      where: { id: id },
    });
  }

  public async update(id: number, item: GymEntity): Promise<Gym> {
    return this.prisma.gym.update({
      where: { id: id },
      data: { ...item },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.gym.delete({
      where: { id },
    });
  }
}
