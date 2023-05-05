import { Injectable } from '@nestjs/common';
import { PublisherDto } from '@fit-friends/core';
import { ISubscriber } from '@fit-friends/shared-types';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NotifyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async addSubscriber(publisher: PublisherDto, authHeader: string) {
    return this.httpService
      .post<ISubscriber>(
        `${this.configService.get('service.notify')}/subscriber`,
        publisher,
        { headers: { authorization: authHeader }}
      )
  }

  public async delSubscriber(publisherId: string, authHeader: string) {
    return this.httpService
      .delete<ISubscriber>(
        `${this.configService.get('service.gyms')}/${publisherId}/subscriber`,
        { headers: { authorization: authHeader }}
      )
  }
}
