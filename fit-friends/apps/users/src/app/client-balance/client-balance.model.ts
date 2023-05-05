import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {IClientBalance, GymsData, TrainingsData } from '@fit-friends/shared-types';

@Schema({collection: 'clientBalances'})
export class ClientBalanceModel extends Document implements IClientBalance {
  @Prop({
    type: Array,
    required: true,
  })
  public trainings: TrainingsData[];

  @Prop({
    type: Array,
    required: true,
  })
  public gyms: GymsData[];
}

export const ClientBalanceSchema = SchemaFactory.createForClass(ClientBalanceModel);
