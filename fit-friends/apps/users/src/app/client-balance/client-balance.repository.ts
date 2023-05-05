import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IClientBalance } from '@fit-friends/shared-types';
import { ICRUDRepository } from '@fit-friends/core';
import { ClientBalanceEntity } from './client-balance.entity';
import { ClientBalanceModel } from './client-balance.model';

@Injectable()
export class ClientBalanceRepository
  implements
    ICRUDRepository<ClientBalanceEntity, Types.ObjectId, IClientBalance>
{
  constructor(
    @InjectModel(ClientBalanceModel.name)
    private readonly clientBalanceModel: Model<ClientBalanceModel>
  ) {}

  private defaultClientBalance: IClientBalance = {
    trainings: [],
    gyms: [],
  };

  public async create(
    item: ClientBalanceEntity = new ClientBalanceEntity(this.defaultClientBalance)
  ): Promise<IClientBalance> {
    const newClientBalance = new this.clientBalanceModel(item);

    return newClientBalance.save();
  }

  public async findById(id: Types.ObjectId): Promise<IClientBalance | null> {
    return this.clientBalanceModel.findById(id).exec();
  }

  public async update(
    id: Types.ObjectId,
    item: Partial<ClientBalanceEntity>
  ): Promise<IClientBalance> {
    return this.clientBalanceModel
      .findByIdAndUpdate(id, item, { new: true })
      .exec();
  }

  public async delete(id: Types.ObjectId): Promise<void> {
    this.clientBalanceModel.deleteOne({ id });
  }
}
