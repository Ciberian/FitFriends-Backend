import { ForbiddenException, Injectable } from '@nestjs/common';
import { IReview, ITokenPayload, UserRole } from '@fit-friends/shared-types';
import { ReviewRepository } from './review.repository';
import { OrderErrorMessage } from '../app.constant';
import { CreateReviewDto } from '@fit-friends/core';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  public async createReview(user: ITokenPayload, dto: CreateReviewDto) {
    if (user.role !== UserRole.Client) {
      throw new ForbiddenException(OrderErrorMessage.WrongUserRole);
    }

    const { trainingId, rating, comment } = dto;
    const review: IReview = {
      authorName: user.name,
      authorAvatar: user.avatar,
      trainingId,
      rating,
      comment,
      creationDate: new Date()
    };
    const reviewEntity = new ReviewEntity(review);

    return await this.reviewRepository.create(reviewEntity);
  }

  public async getReviews(trainingId: number) {
    return await this.reviewRepository.find(trainingId)
  }
}
