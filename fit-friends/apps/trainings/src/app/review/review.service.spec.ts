import { Test } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';
import { TrainingsTest } from '../app.constant';

describe('ReviewService', () => {
  let reviewService: ReviewService;
  const mockReviewRepository = {
    create: jest.fn(() => TrainingsTest.ReviewResult),
    find: jest.fn(() => [TrainingsTest.ReviewResult]),
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ReviewService, ReviewRepository],
    })
      .overrideProvider(ReviewRepository)
      .useValue(mockReviewRepository)
      .compile();

    reviewService = app.get<ReviewService>(ReviewService);
  });

  describe('createReview', () => {
    it('should return subscriber', async () => {
      expect(await reviewService
        .createReview(TrainingsTest.User, TrainingsTest.ReviewDto))
        .toEqual(TrainingsTest.ReviewResult);
    });
  });

  describe('getReviews', () => {
    it('should return an array of Reviews', async () => {
      expect(await reviewService.getReviews(1)).toEqual([TrainingsTest.ReviewResult]);
    });
  });
});
