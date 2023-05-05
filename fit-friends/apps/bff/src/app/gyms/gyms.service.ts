import { Injectable } from '@nestjs/common';
import { IGym } from '@fit-friends/shared-types';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GymsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async getGyms(query: string, authHeader: string) {
    return this.httpService
      .get<IGym[]>(
        `${this.configService.get('service.gyms')}/${query ? `?${query}` : ''}`,
        { headers: { authorization: authHeader }}
      )
  }

  public async getFavoriteGyms(authHeader: string) {
    return this.httpService
      .get<IGym[]>(
        `${this.configService.get('service.gyms')}`,
        { headers: { authorization: authHeader }}
      )
  }

  public async getGym(gymId: number, authHeader: string) {
    return this.httpService
      .get<IGym>(
        `${this.configService.get('service.gyms')}/${gymId}`,
        { headers: { authorization: authHeader }}
      )
  }
}
