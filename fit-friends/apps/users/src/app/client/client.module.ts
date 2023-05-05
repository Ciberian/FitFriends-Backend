import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModel, ClientSchema } from './client.model';
import { ClientRepository } from './client.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ClientModel.name, schema: ClientSchema }]),
  ],
  providers: [ClientRepository],
  exports: [ClientRepository],
})
export class ClientModule {}
