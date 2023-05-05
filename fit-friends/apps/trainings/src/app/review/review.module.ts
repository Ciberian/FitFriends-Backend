import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ReviewController],
  providers: [ReviewRepository, ReviewService, JwtService],
  exports: [ReviewService, ReviewRepository]
})
export class ReviewModule {}
