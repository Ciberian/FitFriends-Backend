import { Test } from '@nestjs/testing';
import { ClientBalanceService } from './client-balance.service';
import { ClientBalanceRepository } from './client-balance.repository';
import { AuthErrorMessage, MOCK_ID_1, UsersTest } from '../app.constant';
import { ClientRepository } from '../client/client.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UserRole } from '@fit-friends/shared-types';

describe('ClientBalanceService', () => {
  let clientBalanceService: ClientBalanceService;
  const mockClientRepository = {
    findById: jest.fn(() => UsersTest.ClientResult),
  };
  const mockClientBalanceRepository = {
    update: jest.fn(() => UsersTest.ClientBalanceResult),
    findById: jest.fn(() => ({...UsersTest.ClientBalanceResult, _id: MOCK_ID_1})),
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        ClientBalanceService,
        ClientRepository,
        ClientBalanceRepository,
      ],
    })
      .overrideProvider(ClientRepository)
      .useValue(mockClientRepository)
      .overrideProvider(ClientBalanceRepository)
      .useValue(mockClientBalanceRepository)
      .compile();

    clientBalanceService = app.get<ClientBalanceService>(ClientBalanceService);
  });

  describe('getClientBalance#1', () => {
    it('should return client balance', async () => {
      expect(await clientBalanceService
        .getClientBalance(MOCK_ID_1, UserRole.Client))
        .toEqual({...UsersTest.ClientBalanceResult, _id: MOCK_ID_1});
    });
  });

  describe('getClientBalance#2', () => {
    it('should throw ForbiddenException', async () => {
      await expect(clientBalanceService
        .getClientBalance(MOCK_ID_1, UserRole.Trainer))
        .rejects
        .toThrow(new ForbiddenException(AuthErrorMessage.WrongUserRole));
    });
  });

  describe('changeClientBalance', () => {
    it('should return updated client balance', async () => {
      expect(await clientBalanceService
        .changeClientBalance(MOCK_ID_1, UserRole.Client, UsersTest.ClientBalanceDto))
        .toEqual(UsersTest.ClientBalanceResult);
    });
  });

  describe('decreaseClientTrainings', () => {
    it('should throw NotFoundException', async () => {
      await expect(clientBalanceService
        .decreaseClientTrainings(MOCK_ID_1, UserRole.Client, {trainingId: 3}))
        .rejects
        .toThrow(new NotFoundException(AuthErrorMessage.TrainingNotFound));
    });
  });
});
