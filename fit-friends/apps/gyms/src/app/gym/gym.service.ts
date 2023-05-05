import { ForbiddenException, Injectable } from '@nestjs/common';
import { GymRepository } from './gym.repository';
import { GymQuery } from './query/gym.query';
import { GymErrorMessage } from '../app.constant';
import { UserRole } from '@fit-friends/shared-types';

@Injectable()
export class GymService {
  constructor(private readonly gymRepository: GymRepository) {}

  public async getGyms(query: GymQuery, userRole: UserRole) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(GymErrorMessage.WrongUserRole);
    }

    return await this.gymRepository.find(query);
  }

  public async getFavoriteGyms(favoriteGyms: number[], userRole: UserRole) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(GymErrorMessage.WrongUserRole);
    }

    return await this.gymRepository.findFavorites(favoriteGyms);
  }

  public async getGym(gymId: number, userRole: UserRole) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(GymErrorMessage.WrongUserRole);
    }

    return await this.gymRepository.findById(gymId);
  }
}
