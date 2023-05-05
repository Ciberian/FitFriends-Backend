import { Injectable } from '@nestjs/common';
import { ICRUDRepository } from '@fit-friends/core';
import { ReviewEntity } from './review.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Review } from '@prisma/client-trainings';

@Injectable()
export class ReviewRepository
  implements ICRUDRepository<ReviewEntity, number, Review>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(review: ReviewEntity): Promise<Review> {
    return this.prisma.$transaction(async (prisma) => {
      const newReview = await prisma.review.create({
        data: { ...review.toObject() },
      });

      const training = await prisma.training.update({
        where: {
          id: review.trainingId,
        },
        data: {
          reviewsCount: {
            increment: 1,
          },
          ratingSum: {
            increment: review.rating,
          },
        },
      });

      await prisma.training.update({
        where: {
          id: review.trainingId,
        },
        data: {
          rating: +(training.ratingSum / training.reviewsCount).toFixed(1),
        },
      });

      return newReview;
    });
  }

  public async find(trainingId: number): Promise<Review[] | null> {
    return this.prisma.review.findMany({
      where: { trainingId },
    });
  }

  public async findById(id: number): Promise<Review | null> {
    return this.prisma.review.findFirst({
      where: { id },
    });
  }

  public async update(id: number, item: ReviewEntity): Promise<Review> {
    return this.prisma.review.update({
      where: { id },
      data: { ...item },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.review.delete({
      where: { id },
    });
  }
}
