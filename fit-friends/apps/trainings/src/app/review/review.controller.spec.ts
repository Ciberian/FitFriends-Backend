import { Test } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UserRole } from '@fit-friends/shared-types';
import { TrainingsTest } from '../app.constant';

describe('ReviewController', () => {
  let reviewController: ReviewController;
  const mockReviewService = {
    createReview: jest.fn(() => TrainingsTest.ReviewResult),
    getReview: jest.fn(() => TrainingsTest.ReviewResult),
    getReviews: jest.fn(() => [TrainingsTest.ReviewResult]),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService],
    })
      .overrideProvider(ReviewService)
      .useValue(mockReviewService)
      .compile();

    reviewController = module.get<ReviewController>(ReviewController);
  });

  describe('createReview', () => {
    it('should return new review', async () => {
      expect(await reviewController
        .create(TrainingsTest.ReviewDto, UserRole.Client))
        .toEqual(TrainingsTest.ReviewResult);
    });
  });

  describe('showReviews', () => {
    it('should return an array of reviews', async () => {
      expect(await reviewController.showTrainingReviews(1)).toEqual([TrainingsTest.ReviewResult]);
    });
  });
});
