import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IClient } from '@fit-friends/shared-types';
import { ICRUDRepository } from '@fit-friends/core';
import { ClientEntity } from './client.entity';
import { ClientModel } from './client.model';
import { UsersQuery } from '../auth/query/users.query';
import { DEFAULT_PAGE, User } from '../app.constant';

@Injectable()
export class ClientRepository
  implements ICRUDRepository<ClientEntity, Types.ObjectId, IClient>
{
  constructor(
    @InjectModel(ClientModel.name)
    private readonly ClientModel: Model<ClientModel>
  ) {}

  public async create(item: ClientEntity): Promise<IClient> {
    const newUser = new this.ClientModel(item);
    return newUser.save();
  }

  public async findById(id: Types.ObjectId): Promise<IClient | null> {
    return this.ClientModel.findById(id).exec();
  }

  public async find({
    page = DEFAULT_PAGE,
    limit = User.DefaultCountLimit,
    sortDirection = User.DefaultSortDirection,
    sortType = User.DefaultSortType,
    location,
    trainingType,
    level,
  }: UsersQuery): Promise<IClient[] | null> {
    return this.ClientModel.find()
      .where(location ? { location: location } : null)
      .where(trainingType ? { trainingType: trainingType } : null)
      .where(level ? { level: level } : null)
      .limit(limit)
      .skip(page > 0 ? limit * (page - 1) : undefined)
      .sort({ [sortType]: sortDirection })
      .exec();
  }

  public async findFriends(friendsId: string[]): Promise<IClient[] | null> {
    return this.ClientModel.find().where('_id').in(friendsId).exec();
  }

  public async findByEmail(email: string): Promise<IClient | null> {
    return this.ClientModel.findOne({ email }).exec();
  }

  public async update(
    id: Types.ObjectId,
    item: Partial<ClientEntity>
  ): Promise<IClient> {
    return this.ClientModel.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  public async delete(id: Types.ObjectId): Promise<void> {
    this.ClientModel.deleteOne({ id });
  }
}
