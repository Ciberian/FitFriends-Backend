import { Test } from '@nestjs/testing';
import { GymService } from './gym.service';
import { GymRepository } from './gym.repository';
import { UserRole } from '@fit-friends/shared-types';
import { GymsTest } from '../app.constant';

describe('GymService', () => {
  let gymService: GymService;
  const mockGymRepository = {
    find: jest.fn(() => [GymsTest.Result]),
    findFavorites: jest.fn(() => [GymsTest.Result]),
    findById: jest.fn(() => GymsTest.Result),
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [GymService, GymRepository],
    })
      .overrideProvider(GymRepository)
      .useValue(mockGymRepository)
      .compile();

    gymService = app.get<GymService>(GymService);
  });

  describe('getGyms', () => {
    it('should return an array of gyms', async () => {
      expect(await gymService.getGyms({limit: 1}, UserRole.Client)).toEqual([GymsTest.Result]);
    });
  });

  describe('getFavoriteGyms', () => {
    it('should return array of favorite gyms', async () => {
      expect(await gymService.getFavoriteGyms([1], UserRole.Client)).toEqual([GymsTest.Result]);
    });
  });

  describe('getOneGym', () => {
    it('should return the gym by its ID', async () => {
      expect(await gymService.getGym(1, UserRole.Client)).toEqual(GymsTest.Result);
    });
  });
});
