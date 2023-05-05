import { Injectable } from '@nestjs/common';
import { IReview } from '@fit-friends/shared-types';
import { CreateReviewDto } from '@fit-friends/core';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  public async createReview(newReviewDto: CreateReviewDto, authHeader: string) {
    return this.httpService
      .post<IReview>(
        `${this.configService.get('service.reviews')}/create`,
        newReviewDto,
        { headers: { authorization: authHeader }}
      )
  }

  public async getReviews(trainingId: number, authHeader: string) {
    return this.httpService
      .get<IReview>(
        `${this.configService.get('service.reviews')}/${trainingId}`,
        { headers: { authorization: authHeader }}
      )
  }
}
