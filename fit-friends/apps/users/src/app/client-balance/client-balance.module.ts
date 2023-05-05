import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientBalanceModel, ClientBalanceSchema } from './client-balance.model';
import { ClientBalanceRepository } from './client-balance.repository';
import { ClientBalanceController } from './client-balance.controller';
import { ClientBalanceService } from './client-balance.service';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientBalanceModel.name, schema: ClientBalanceSchema },
    ]),
    ClientModule,
  ],
  controllers: [ClientBalanceController],
  providers: [ClientBalanceRepository, ClientBalanceService],
  exports: [ClientBalanceRepository, ClientBalanceService],
})
export class ClientBalanceModule {}
