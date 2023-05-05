import { Document } from 'mongoose';
import { ISubscriber } from '@fit-friends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  SubscriberValidationMessage,
  SUBSCRIBERS_COLLECTION_NAME,
} from '../app.constant';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements ISubscriber {
  @Prop({
    required: true,
    match: [
      /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      SubscriberValidationMessage.EmailNotValid,
    ],
  })
  public email: string;

  @Prop({
    required: true,
  })
  public userName: string;

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public trainerId: string;

  @Prop({
    required: true,
  })
  public trainerName: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
