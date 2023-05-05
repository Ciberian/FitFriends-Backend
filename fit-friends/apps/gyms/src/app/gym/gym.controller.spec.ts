import { Test } from '@nestjs/testing';
import { GymService } from './gym.service';
import { GymController } from './gym.controller';
import { UserRole } from '@fit-friends/shared-types';
import { GymsTest } from '../app.constant';

describe('GymController', () => {
  let gymController: GymController;
  const mockGymService = {
    getGyms: jest.fn(() => [GymsTest.Result]),
    getFavoriteGyms: jest.fn(() => [GymsTest.Result]),
    getGym: jest.fn(() => GymsTest.Result),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [GymController],
      providers: [GymService],
    })
      .overrideProvider(GymService)
      .useValue(mockGymService)
      .compile();

    gymController = module.get<GymController>(GymController);
  });

  describe('showGyms', () => {
    it('should return an array of gyms', async () => {
      expect(await gymController.index({limit: 1}, UserRole.Client)).toEqual([GymsTest.Result]);
    });
  });

  describe('showFavoriteGyms', () => {
    it('should return array of favorite gyms', async () => {
      expect(await gymController.showFavoriteGyms(GymsTest.User)).toEqual([GymsTest.Result]);
    });
  });

  describe('showOneGym', () => {
    it('should return the gym by its ID', async () => {
      expect(await gymController.show(1, UserRole.Client)).toEqual(GymsTest.Result);
    });
  });
});
