import { Test } from '@nestjs/testing';
import { ClientRepository } from '../client/client.repository';
import { TrainingDiaryService } from './training-diary.service';
import { TrainingDiaryRepository } from './training-diary.repository';
import { ForbiddenException } from '@nestjs/common';
import { UserRole } from '@fit-friends/shared-types';
import {
  UsersTest,
  MOCK_ID_1,
  AuthErrorMessage,
  DEFAULT_TRAINING_DIARY,
} from '../app.constant';

describe('TrainingDiaryService', () => {
  let trainingDiaryService: TrainingDiaryService;
  const mockClientRepository = {
    findById: jest.fn(() => UsersTest.ClientResult),
  };
  const mockTrainingDiaryRepository = {
    update: jest.fn(() => DEFAULT_TRAINING_DIARY),
    findById: jest.fn(() => ({...DEFAULT_TRAINING_DIARY, _id: MOCK_ID_1})),
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        TrainingDiaryService,
        ClientRepository,
        TrainingDiaryRepository,
      ],
    })
      .overrideProvider(ClientRepository)
      .useValue(mockClientRepository)
      .overrideProvider(TrainingDiaryRepository)
      .useValue(mockTrainingDiaryRepository)
      .compile();

    trainingDiaryService = app.get<TrainingDiaryService>(TrainingDiaryService);
  });

  describe('getTrainingDiary', () => {
    it('should return training diary', async () => {
      expect(await trainingDiaryService
        .getTrainingDiary(MOCK_ID_1, UserRole.Client))
        .toEqual({...DEFAULT_TRAINING_DIARY, _id: MOCK_ID_1});
    });
  });

  describe('changeTrainingDiary', () => {
    it('should return updated training diary', async () => {
      expect(await trainingDiaryService
        .getTrainingDiary(MOCK_ID_1, UserRole.Client))
        .toEqual({...DEFAULT_TRAINING_DIARY, _id: MOCK_ID_1});
    });
  });

  describe('changeTrainingDiary', () => {
    it('should throw ForbiddenException', async () => {
      await expect(trainingDiaryService
        .changeTrainingDiary(MOCK_ID_1, UserRole.Trainer, UsersTest.TrainingDiaryDto))
        .rejects
        .toThrow(new ForbiddenException(AuthErrorMessage.WrongUserRole));
    });
  });
});
