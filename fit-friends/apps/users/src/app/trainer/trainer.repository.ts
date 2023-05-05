import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ITrainer } from '@fit-friends/shared-types';
import { ICRUDRepository } from '@fit-friends/core';
import { TrainerEntity } from './trainer.entity';
import { TrainerModel } from './trainer.model';
import { UsersQuery } from '../auth/query/users.query';
import { DEFAULT_PAGE, User } from '../app.constant';

@Injectable()
export class TrainerRepository
  implements ICRUDRepository<TrainerEntity, Types.ObjectId, ITrainer>
{
  constructor(
    @InjectModel(TrainerModel.name)
    private readonly TrainerModel: Model<TrainerModel>
  ) {}

  public async create(item: TrainerEntity): Promise<ITrainer> {
    const newUser = new this.TrainerModel(item);

    return newUser.save();
  }

  public async findById(id: Types.ObjectId): Promise<ITrainer | null> {
    return this.TrainerModel.findById(id).exec();
  }

  public async find({
    page = DEFAULT_PAGE,
    limit = User.DefaultCountLimit,
    sortDirection = User.DefaultSortDirection,
    sortType = User.DefaultSortType,
    location,
    trainingType,
    level,
  }: UsersQuery): Promise<ITrainer[] | null> {
    return this.TrainerModel.find()
      .where(location ? { location: location } : null)
      .where(trainingType ? { trainingType: trainingType } : null)
      .where(level ? { level: level } : null)
      .limit(limit)
      .skip(page > 0 ? limit * (page - 1) : undefined)
      .sort({ [sortType]: sortDirection })
      .exec();
  }

  public async findFriends(friendsId: string[]): Promise<ITrainer[] | null> {
    return this.TrainerModel.find().where('_id').in(friendsId).exec();
  }

  public async findByEmail(email: string): Promise<ITrainer | null> {
    return this.TrainerModel.findOne({ email }).exec();
  }

  public async update(
    id: Types.ObjectId,
    item: Partial<TrainerEntity>
  ): Promise<ITrainer> {
    return this.TrainerModel.findByIdAndUpdate(id, item, {
      new: true,
    }).exec();
  }

  public async delete(id: Types.ObjectId): Promise<void> {
    this.TrainerModel.deleteOne({ id });
  }
}
