import {
  Injectable,
  ForbiddenException,
  NotFoundException
} from '@nestjs/common';
import {
  fillDTO,
  ClientBalanceRdo,
  UpdateClientBalanceDto,
  DecreaseClientBalanceDto,
} from '@fit-friends/core';
import { ClientRepository } from '../client/client.repository';
import { ClientBalanceRepository } from './client-balance.repository';
import { OrderType, UserRole } from '@fit-friends/shared-types';
import { AuthErrorMessage } from '../app.constant';
import { Types } from 'mongoose';

@Injectable()
export class ClientBalanceService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly clientBalanceRepository: ClientBalanceRepository,
  ) {}

  public async getClientBalance(userId: Types.ObjectId, userRole: UserRole) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(AuthErrorMessage.WrongUserRole);
    }

    const { balanceId } = await this.clientRepository.findById(userId);

    return this.clientBalanceRepository.findById(balanceId);
  }

  public async changeClientBalance(userId: Types.ObjectId, userRole: UserRole, dto: UpdateClientBalanceDto) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(AuthErrorMessage.WrongUserRole);
    }

    const { type, serviceId, quantity } = dto;
    const client = await this.clientRepository.findById(userId);
    const clientBalance = fillDTO(ClientBalanceRdo, await this.clientBalanceRepository.findById(client.balanceId));

    if (type === OrderType.Training) {
      const indexExistTraining = clientBalance.trainings.findIndex((training) => training.trainingId === serviceId);

      if (indexExistTraining !== -1) {
        clientBalance.trainings[indexExistTraining].availableTrainingsCount += quantity;
      } else {
        clientBalance.trainings.push({trainingId: serviceId, availableTrainingsCount: quantity});
      }
    } else {
      const indexExistGym = clientBalance.gyms.findIndex((training) => training.gymId === serviceId);

      if (indexExistGym !== -1) {
        clientBalance.gyms[indexExistGym].seasonPassCount += quantity;
      } else {
        clientBalance.gyms.push({gymId: serviceId, seasonPassCount: quantity});
      }
    }

    return this.clientBalanceRepository.update(client.balanceId, clientBalance);
  }

  public async decreaseClientTrainings(userId: Types.ObjectId, userRole: UserRole, { trainingId }: DecreaseClientBalanceDto) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(AuthErrorMessage.WrongUserRole);
    }

    const client = await this.clientRepository.findById(userId);
    const clientBalance = fillDTO(ClientBalanceRdo, await this.clientBalanceRepository.findById(client.balanceId));
    const indexExistTraining = clientBalance.trainings.findIndex((training) => training.trainingId === trainingId);

    if (indexExistTraining === -1) {
      throw new NotFoundException(AuthErrorMessage.TrainingNotFound);
    } else {
      clientBalance.trainings[indexExistTraining].availableTrainingsCount--;
    }

    return this.clientBalanceRepository.update(client.balanceId, clientBalance);
  }
}
