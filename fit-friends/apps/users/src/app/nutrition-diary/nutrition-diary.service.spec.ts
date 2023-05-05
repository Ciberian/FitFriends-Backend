import { Test } from '@nestjs/testing';
import { ClientRepository } from '../client/client.repository';
import { NutritionDiaryService } from './nutrition-diary.service';
import { NutritionDiaryRepository } from './nutrition-diary.repository';
import { AuthErrorMessage, DEFAULT_NUTRITION_DIARY, MOCK_ID_1, UsersTest } from '../app.constant';
import { ForbiddenException } from '@nestjs/common';
import { UserRole } from '@fit-friends/shared-types';

describe('NutritionDiaryService', () => {
  let nutritionDiaryService: NutritionDiaryService;
  const mockClientRepository = {
    findById: jest.fn(() => UsersTest.ClientResult),
  };
  const mockNutritionDiaryRepository = {
    update: jest.fn(() => DEFAULT_NUTRITION_DIARY),
    findById: jest.fn(() => ({...DEFAULT_NUTRITION_DIARY, _id: MOCK_ID_1})),
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        NutritionDiaryService,
        ClientRepository,
        NutritionDiaryRepository,
      ],
    })
      .overrideProvider(ClientRepository)
      .useValue(mockClientRepository)
      .overrideProvider(NutritionDiaryRepository)
      .useValue(mockNutritionDiaryRepository)
      .compile();

    nutritionDiaryService = app.get<NutritionDiaryService>(NutritionDiaryService);
  });

  describe('getNutritionDiary', () => {
    it('should return client balance', async () => {
      expect(await nutritionDiaryService
        .getNutritionDiary(MOCK_ID_1, UserRole.Client))
        .toEqual({...DEFAULT_NUTRITION_DIARY, _id: MOCK_ID_1});
    });
  });

  describe('changeNutritionDiary', () => {
    it('should return updated client balance', async () => {
      expect(await nutritionDiaryService
        .getNutritionDiary(MOCK_ID_1, UserRole.Client))
        .toEqual({...DEFAULT_NUTRITION_DIARY, _id: MOCK_ID_1});
    });
  });

  describe('changeNutritionDiary', () => {
    it('should throw ForbiddenException', async () => {
      await expect(nutritionDiaryService
        .changeNutritionDiary(MOCK_ID_1, UserRole.Trainer, {breakfast: 700}))
        .rejects
        .toThrow(new ForbiddenException(AuthErrorMessage.WrongUserRole));
    });
  });
});
