import { Test } from '@nestjs/testing';
import { TrainingDiaryService } from './training-diary.service';
import { TrainingDiaryController } from './training-diary.controller';
import {
  UsersTest,
  MOCK_ID_1,
  MOCK_ID_3,
  DEFAULT_TRAINING_DIARY,
} from '../app.constant';

describe('TrainingDiaryController', () => {
  let trainingDiaryController: TrainingDiaryController;
  const mockTrainingDiaryService = {
    getTrainingDiary: jest.fn(() => ({...DEFAULT_TRAINING_DIARY, _id: MOCK_ID_1})),
    changeTrainingDiary: jest.fn(() => ({...DEFAULT_TRAINING_DIARY, _id: MOCK_ID_1})),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [TrainingDiaryController],
      providers: [TrainingDiaryService],
    })
      .overrideProvider(TrainingDiaryService)
      .useValue(mockTrainingDiaryService)
      .compile();

    trainingDiaryController = module.get<TrainingDiaryController>(TrainingDiaryController);
  });

  describe('showTrainingDiary', () => {
    it('should return user training diary', async () => {
      expect(await trainingDiaryController
        .showTrainingDiary(UsersTest.User))
        .toEqual({...DEFAULT_TRAINING_DIARY, id: MOCK_ID_3});
    });
  });

  describe('updateTrainingDiary', () => {
    it('should return updated user training diary', async () => {
      expect(await trainingDiaryController
        .updateTrainingDiary(UsersTest.TrainingDiaryDto, UsersTest.User))
        .toEqual({...DEFAULT_TRAINING_DIARY, id: MOCK_ID_3});
    });
  });
});
