import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ClientRepository } from '../client/client.repository';
import { TrainerRepository } from '../trainer/trainer.repository';
import { NutritionDiaryRepository } from '../nutrition-diary/nutrition-diary.repository';
import { TrainingDiaryRepository } from '../training-diary/training-diary.repository';
import { ClientBalanceRepository } from '../client-balance/client-balance.repository';
import { ClientEntity } from '../client/client.entity';
import { UserRole } from '@fit-friends/shared-types';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  AuthErrorMessage,
  FavoriteGymsAction,
  UsersTest,
  MOCK_ID_1,
  MOCK_ID_2,
} from '../app.constant';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  const mockClientRepository = {
    create: jest.fn(() => UsersTest.ClientResult),
    update: jest.fn(() => UsersTest.ClientResult),
    findById: jest.fn(() => ({...UsersTest.ClientResult, refreshTokenHash: 'token-hash'})),
    findByEmail: jest.fn(() => null),
    find: jest.fn(() => [UsersTest.ClientResult]),
    findFriends: jest.fn(() => [UsersTest.ClientResult]),
  };

  const mockTrainerRepository = {
    findByEmail: jest.fn(() => ({...UsersTest.ClientResult, passwordHash: ''})),
    find: jest.fn(() => [{...UsersTest.ClientResult, role: UserRole.Trainer}]),
    findFriends: jest.fn(() => [{...UsersTest.ClientResult, role: UserRole.Trainer}]),
  }

  const mockNutritionDiaryRepository = {
    create: jest.fn(() => UsersTest.ClientResult)
  }

  const mockTrainingDiaryRepository = {
    create: jest.fn(() => UsersTest.ClientResult)
  }

  const mockClientBalanceRepository = {
    create: jest.fn(() => UsersTest.ClientResult)
  }

  const mockJwtService = {
    signAsync: jest.fn(() => '')
  }

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        ClientRepository,
        TrainerRepository,
        NutritionDiaryRepository,
        TrainingDiaryRepository,
        ClientBalanceRepository,
        JwtService,
        ConfigService,
      ],
    })
      .overrideProvider(ClientRepository)
      .useValue(mockClientRepository)
      .overrideProvider(TrainerRepository)
      .useValue(mockTrainerRepository)
      .overrideProvider(NutritionDiaryRepository)
      .useValue(mockNutritionDiaryRepository)
      .overrideProvider(TrainingDiaryRepository)
      .useValue(mockTrainingDiaryRepository)
      .overrideProvider(ClientBalanceRepository)
      .useValue(mockClientBalanceRepository)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('registerUser', () => {
    it('should return new user', async () => {
      expect(await authService
        .register(UsersTest.ClientDto))
        .toEqual(UsersTest.ClientResult);
    });
  });

  describe('verifyUser', () => {
    it('should throw UnauthorizedException', async () => {
      await expect( authService
        .verifyUser({email: 'client-test@mail.com', password: 'abcdef'}))
        .rejects
        .toThrow(new UnauthorizedException(AuthErrorMessage.UserPasswordWrong));
    });
  });

  describe('loginUser', () => {
    it('should return access and refresh tokens', async () => {
      expect(await authService
        .loginUser(new ClientEntity({
          ...UsersTest.ClientDto,
          clientProgress: undefined,
          passwordHash: '',
          _id: MOCK_ID_1
        })))
        .toEqual({access_token: '', refresh_token: ''});
    });
  });

  describe('refreshTokens', () => {
    it('should throw ForbiddenException', async () => {
      await expect(authService
        .refresh(MOCK_ID_1, 'token-hash'))
        .rejects
        .toThrow(new ForbiddenException(AuthErrorMessage.RefreshTokenNotValid));
    });
  });

  describe('dropRefreshToken', () => {
    it('should drop refresh token', async () => {
      expect(await authService
        .drop(MOCK_ID_1))
        .toEqual({refresh_token: ''});
    });
  });

  describe('getUser', () => {
    it('should return user', async () => {
      expect(await authService
        .getUser(MOCK_ID_1))
        .toEqual({...UsersTest.ClientResult, refreshTokenHash: 'token-hash'});
    });
  });

  describe('getUsers', () => {
    it('should return array of users', async () => {
      expect(await authService
        .getUsers({limit: 1}, UserRole.Client))
        .toEqual([
          {...UsersTest.ClientResult},
          {...UsersTest.ClientResult, role: UserRole.Trainer},
        ]);
    });
  });

  describe('getFriends', () => {
    it('should return array of user friends', async () => {
      expect(await authService
        .getFriends(MOCK_ID_1, UserRole.Client))
        .toEqual([
          {...UsersTest.ClientResult},
          {...UsersTest.ClientResult, role: UserRole.Trainer},
        ]);
    });
  });

  describe('reqFriendship#1', () => {
    it('should throw ForbiddenException', async () => {
      await expect(authService
        .reqFriendship(
          {userId: MOCK_ID_1},
          MOCK_ID_1,
          UserRole.Client
        ))
        .rejects
        .toThrow(new ConflictException(AuthErrorMessage.SameId));
    });
  });

  describe('reqFriendship#2', () => {
    it('should send request to user and return nothing', async () => {
      expect(await authService
        .reqFriendship(
          {userId: MOCK_ID_1},
          MOCK_ID_2,
          UserRole.Client
        ))
        .toEqual(undefined);
    });
  });

  describe('accFriendship', () => {
    it('should throw ForbiddenException', async () => {
      await expect(authService
        .accFriendship(
          {userId: MOCK_ID_1},
          MOCK_ID_2,
        ))
        .rejects
        .toThrow(new ForbiddenException(AuthErrorMessage.CantAcceptFriend));
    });
  });

  describe('rejFriendship', () => {
    it('should throw ForbiddenException', async () => {
      await expect(authService
        .rejFriendship(
          {userId: MOCK_ID_1},
          MOCK_ID_2,
        ))
        .rejects
        .toThrow(new ForbiddenException(AuthErrorMessage.CantRejectUser));
    });
  });

  describe('delFriend', () => {
    it('should throw NotFoundException', async () => {
      await expect(authService
        .delFriend(
          {userId: MOCK_ID_1},
          MOCK_ID_2
        ))
        .rejects
        .toThrow(new NotFoundException(AuthErrorMessage.DontHaveFriend));
    });
  });

  describe('delAlerts', () => {
    it('should delete user alerts and return updated user', async () => {
      expect(await authService
        .delAlerts(MOCK_ID_2))
        .toEqual(UsersTest.ClientResult);
    });
  });

  describe('reqPersonalTraining', () => {
    it('should throw ConflictException', async () => {
      await expect(authService
        .reqPersonalTraining(
          {userId: MOCK_ID_1},
          MOCK_ID_1,
          UserRole.Client
        ))
        .rejects
        .toThrow(new ConflictException(AuthErrorMessage.NotFriend));
    });
  });

  describe('accPersonalTraining', () => {
    it('should throw ForbiddenException', async () => {
      await expect(authService
        .accPersonalTraining(
          {userId: MOCK_ID_1},
          MOCK_ID_1
        ))
        .rejects
        .toThrow(new ForbiddenException(AuthErrorMessage.CantAcceptTraining));
    });
  });

  describe('rejPersonalTraining', () => {
    it('should throw ForbiddenException', async () => {
      await expect(authService
        .rejPersonalTraining(
          {userId: MOCK_ID_1},
          MOCK_ID_1
        ))
        .rejects
        .toThrow(new ForbiddenException(AuthErrorMessage.CantAcceptTraining));
    });
  });

  describe('updateUser#1', () => {
    it('should throw ForbiddenException', async () => {
      await expect(authService
        .updateUser(MOCK_ID_1, UsersTest.ClientDto))
        .rejects
        .toThrow(new ForbiddenException(AuthErrorMessage.UpdateForbiddenProperties));
    });
  });

  describe('updateUser#2', () => {
    it('should return updated user', async () => {
      expect(await authService
        .updateUser(MOCK_ID_1, {name: 'John'}))
        .toEqual(UsersTest.ClientResult);
    });
  });

  describe('updateFavoriteGymsList#1', () => {
    it('should ADD gym to user favorite list and return nothing', async () => {
      expect(await authService
        .updateFavoriteGymsList(
          MOCK_ID_1,
          UserRole.Client,
          {gymId: 4},
          FavoriteGymsAction.Add
        ))
        .toEqual(undefined);
    });
  });

  describe('updateFavoriteGymsList#2', () => {
    it('should throw ConflictException', async () => {
      await expect(authService
        .updateFavoriteGymsList(
          MOCK_ID_1,
          UserRole.Client,
          {gymId: 1},
          FavoriteGymsAction.Add
        ))
        .rejects
        .toThrow(new ConflictException(AuthErrorMessage.GymAlreadyFavorite));
    });
  });

  describe('updateFavoriteGymsList#3', () => {
    it('should throw ConflictException', async () => {
      await expect(authService
        .updateFavoriteGymsList(
          MOCK_ID_1,
          UserRole.Client,
          {gymId: 5},
          FavoriteGymsAction.Delete
        ))
        .rejects
        .toThrow(new ConflictException(AuthErrorMessage.GymNotFavorite));
    });
  });

  describe('updateFavoriteGymsList#4', () => {
    it('should DELETE gym to user favorite list and return nothing', async () => {
      expect(await authService
        .updateFavoriteGymsList(
          MOCK_ID_1,
          UserRole.Client,
          {gymId: 1},
          FavoriteGymsAction.Delete
        ))
        .toEqual(undefined);
    });
  });
});
