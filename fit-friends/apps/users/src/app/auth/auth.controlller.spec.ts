import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './Auth.controller';
import { UserRole } from '@fit-friends/shared-types';
import {
  UsersTest,
  MOCK_ID_1,
  MOCK_ID_2,
  MOCK_ID_3,
  MockAdditionalUserData
} from '../app.constant';

describe('AuthController', () => {
  let authController: AuthController;
  const mockAuthService = {
    register: jest.fn(() => ({...UsersTest.ClientResult, _id: MOCK_ID_1})),
    loginUser: jest.fn(() => ({...UsersTest.ClientResult, _id: MOCK_ID_1})),
    verifyUser: jest.fn(() => ({...UsersTest.ClientResult, _id: MOCK_ID_1})),
    refresh: jest.fn(() => ({...UsersTest.ClientResult, _id: MOCK_ID_1})),
    drop: jest.fn(() => ({refresh_token: ''})),
    getFriends: jest.fn(() => [{...UsersTest.ClientResult, _id: MOCK_ID_1}]),
    reqFriendship: jest.fn(() => undefined),
    accFriendship: jest.fn(() => undefined),
    rejFriendship: jest.fn(() => undefined),
    delFriend: jest.fn(() => undefined),
    delAlerts: jest.fn(() => ({...UsersTest.ClientResult, _id: MOCK_ID_1})),
    reqPersonalTraining: jest.fn(() => undefined),
    accPersonalTraining: jest.fn(() => undefined),
    rejPersonalTraining: jest.fn(() => undefined),
    getUser: jest.fn(() => ({...UsersTest.ClientResult, _id: MOCK_ID_1})),
    getUsers: jest.fn(() => ([{...UsersTest.ClientResult, _id: MOCK_ID_1}])),
    updateUser: jest.fn(() => ({...UsersTest.ClientResult, _id: MOCK_ID_1})),
    updateFavoriteGymsList: jest.fn(() => undefined),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  describe('registerUser', () => {
    it('should return new User', async () => {
      expect(await authController
        .create(UsersTest.ClientDto))
        .toEqual({...UsersTest.ClientResult, id: MOCK_ID_3});
    });
  });

  describe('loginUser', () => {
    it('should return login user data', async () => {
      expect(await authController
        .login({email: 'my@mail.com', password: 'abcdef'}))
        .toEqual({...UsersTest.LoginResult, id: MOCK_ID_3});
    });
  });

  describe('refreshTokens', () => {
    it('should return login user data with new tokens', async () => {
      expect(await authController
        .refresh(UsersTest.User.id, { refreshToken: 'some-refresh-token-hash' }))
        .toEqual({...UsersTest.LoginResult, id: MOCK_ID_3});
    });
  });

  describe('dropRefreshToken', () => {
    it('should drop refresh token', async () => {
      expect(await authController
        .drop(UsersTest.User.id))
        .toEqual({"refresh_token": ""});
    });
  });

  describe('showFriends', () => {
    it('should return user friends', async () => {
      expect(await authController
        .showFriends(UsersTest.User))
        .toEqual([{
          ...UsersTest.ClientResult,
          ...MockAdditionalUserData,
          id: MOCK_ID_3,
        }]);
    });
  });

  describe('requestFriendship', () => {
    it('should send request to user and return nothing', async () => {
      expect(await authController
        .requestFriendship({userId: MOCK_ID_2}, UsersTest.User))
        .toEqual(undefined);
    });
  });

  describe('acceptFriendship', () => {
    it('should accept friendship and return nothing', async () => {
      expect(await authController
        .acceptFriendship({userId: MOCK_ID_2}, UsersTest.User.id))
        .toEqual(undefined);
    });
  });

  describe('rejectFriendship', () => {
    it('should reject friendship and return nothing', async () => {
      expect(await authController
        .rejectFriendship({userId: MOCK_ID_2}, UsersTest.User.id))
        .toEqual(undefined);
    });
  });

  describe('deleteFriend', () => {
    it('should delete friend from friends list and return nothing', async () => {
      expect(await authController
        .deleteFriend({userId: MOCK_ID_2}, UsersTest.User.id))
        .toEqual(undefined);
    });
  });

  describe('deleteAlerts', () => {
    it('should delete user alerts and return updated user', async () => {
      expect(await authController
        .deleteAlerts(UsersTest.User.id))
        .toEqual({
          ...UsersTest.ClientResult,
          ...MockAdditionalUserData,
          id: MOCK_ID_3,
        });
    });
  });

  describe('requestPersonalTraining', () => {
    it('should send request personal training and return nothing', async () => {
      expect(await authController
        .requestPersonalTraining({userId: MOCK_ID_2}, UsersTest.User))
        .toEqual(undefined);
    });
  });

  describe('acceptPersonalTraining', () => {
    it('should accept personal training and return nothing', async () => {
      expect(await authController
        .acceptPersonalTraining({userId: MOCK_ID_2}, UsersTest.User.id))
        .toEqual(undefined);
    });
  });

  describe('rejectPersonalTraining', () => {
    it('should reject personal training and return nothing', async () => {
      expect(await authController
        .rejectPersonalTraining({userId: MOCK_ID_2}, UsersTest.User.id))
        .toEqual(undefined);
    });
  });

  describe('getUser', () => {
    it('should return user', async () => {
      expect(await authController
        .show(UsersTest.User.id))
        .toEqual({
          ...UsersTest.ClientResult,
          ...MockAdditionalUserData,
          id: MOCK_ID_3,
        });
    });
  });

  describe('getUsers', () => {
    it('should return array of users', async () => {
      expect(await authController
        .index({limit: 1}, UserRole.Client))
        .toEqual([{
          ...UsersTest.ClientResult,
          ...MockAdditionalUserData,
          id: MOCK_ID_3,
        }]);
    });
  });

  describe('updateUser', () => {
    it('should return updated user', async () => {
      expect(await authController
        .update(UsersTest.ClientDto, UsersTest.User.id))
        .toEqual({
          ...UsersTest.ClientResult,
          ...MockAdditionalUserData,
          id: MOCK_ID_3,
        });
    });
  });

  describe('addNewFavoriteGym', () => {
    it('should add gym to user favorite list and return nothing', async () => {
      expect(await authController
        .addFavoriteGym({gymId: 1}, UsersTest.User))
        .toEqual(undefined);
    });
  });

  describe('deleteNewFavoriteGym', () => {
    it('should add gym to user favorite list and return nothing', async () => {
      expect(await authController
        .delFavoriteGym({gymId: 1}, UsersTest.User))
        .toEqual(undefined);
    });
  });
});
