import { Test } from '@nestjs/testing';
import { NutritionDiaryService } from './nutrition-diary.service';
import { NutritionDiaryController } from './nutrition-diary.controller';
import { DEFAULT_NUTRITION_DIARY, MOCK_ID_1, MOCK_ID_3, UsersTest } from '../app.constant';

describe('NutritionDiaryController', () => {
  let nutritionDiaryController: NutritionDiaryController;
  const mockNutritionDiaryService = {
    getNutritionDiary: jest.fn(() => ({...DEFAULT_NUTRITION_DIARY, _id: MOCK_ID_1})),
    changeNutritionDiary: jest.fn(() => ({...DEFAULT_NUTRITION_DIARY, _id: MOCK_ID_1})),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [NutritionDiaryController],
      providers: [NutritionDiaryService],
    })
      .overrideProvider(NutritionDiaryService)
      .useValue(mockNutritionDiaryService)
      .compile();

    nutritionDiaryController = module.get<NutritionDiaryController>(NutritionDiaryController);
  });

  describe('getNutritionDiary', () => {
    it('should return user nutrition diary', async () => {
      expect(await nutritionDiaryController
        .showNutritionDiary(UsersTest.User))
        .toEqual({...DEFAULT_NUTRITION_DIARY, id: MOCK_ID_3});
    });
  });

  describe('updateNutritionDiary', () => {
    it('should return updated user nutrition diary', async () => {
      expect(await nutritionDiaryController
        .updateNutritionDiary({breakfast: 700}, UsersTest.User))
        .toEqual({...DEFAULT_NUTRITION_DIARY, id: MOCK_ID_3});
    });
  });
});
