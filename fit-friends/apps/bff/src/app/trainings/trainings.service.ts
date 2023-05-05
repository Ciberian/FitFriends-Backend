import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CreateTrainingDto, UpdateTrainingDto } from '@fit-friends/core';
import { ITraining } from '@fit-friends/shared-types';
import { firstValueFrom } from 'rxjs';
import * as FormData from 'form-data'

@Injectable()
export class TrainingsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  public async create(newTrainingDto: CreateTrainingDto, authHeader: string) {
    const { data: training } = await firstValueFrom(
      this.httpService
        .post<ITraining>(
          `${this.configService.get('service.trainings')}/create`,
          newTrainingDto,
          { headers: { authorization: authHeader }}
        )
    )

    return training;
  }

  public async updateTraining(trainingId: number, trainingDto: UpdateTrainingDto, authHeader: string) {
    return this.httpService
      .patch<ITraining>(
        `${this.configService.get('service.trainings')}/${trainingId}`,
        trainingDto,
        { headers: { authorization: authHeader }}
      )
  }

  public async getTrainings(query: string, authHeader: string) {
    return this.httpService
      .get<ITraining[]>(
        `${this.configService.get('service.trainings')}/${query ? `?${query}` : ''}`,
        { headers: { authorization: authHeader }}
      )
  }

  public async getPersonalTrainings(query: string, authHeader: string) {
    return this.httpService
      .get<ITraining[]>(
        `${this.configService.get('service.trainings')}/personal/${query ? `?${query}` : ''}`,
        { headers: { authorization: authHeader }}
      )
  }

  public async getTraining(trainingId: number, authHeader: string) {
    return this.httpService
    .get<ITraining>(
      `${this.configService.get('service.trainings')}/${trainingId}`,
      { headers: { authorization: authHeader }}
    )
  }

  async uploadVideo(trainingId: number, file: Express.Multer.File, authHeader: string) {
    const form = new FormData();
    form.append('video', file.buffer, file.originalname);

    return this.httpService
      .post<ITraining>(
        `${this.configService.get('services.trainings')}/${trainingId}/video`,
        form,
        {
          headers: {
            ...form.getHeaders(),
            authorization: authHeader,
          },
        }
      )
  }
}
