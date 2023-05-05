import { Test } from '@nestjs/testing';
import { ClientBalanceService } from './client-balance.service';
import { ClientBalanceController } from './client-balance.controller';
import { MOCK_ID_1, MOCK_ID_3, UsersTest } from '../app.constant';

describe('ClientBalanceController', () => {
  let clientBalanceController: ClientBalanceController;
  const mockClientBalanceService = {
    getClientBalance: jest.fn(() => ({...UsersTest.ClientBalanceResult, _id: MOCK_ID_1})),
    changeClientBalance: jest.fn(() => ({...UsersTest.ClientBalanceResult, _id: MOCK_ID_1})),
    decreaseClientTrainings: jest.fn(() => ({...UsersTest.ClientBalanceResult, _id: MOCK_ID_1})),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ClientBalanceController],
      providers: [ClientBalanceService],
    })
      .overrideProvider(ClientBalanceService)
      .useValue(mockClientBalanceService)
      .compile();

    clientBalanceController = module.get<ClientBalanceController>(ClientBalanceController);
  });

  describe('getClientBalance', () => {
    it('should return client balance', async () => {
      expect(await clientBalanceController
        .showClientBalance(UsersTest.User))
        .toEqual({...UsersTest.ClientBalanceResult, id: MOCK_ID_3});
    });
  });

  describe('updateClientBalance', () => {
    it('should return updated client balance', async () => {
      expect(await clientBalanceController
        .updateClientBalance(UsersTest.ClientBalanceDto, UsersTest.User))
        .toEqual({...UsersTest.ClientBalanceResult, id: MOCK_ID_3});
    });
  });

  describe('decreaseClientBalances', () => {
    it('should return decreased client balance', async () => {
      expect(await clientBalanceController
        .decreaseClientBalance({trainingId: 3}, UsersTest.User))
        .toEqual({...UsersTest.ClientBalanceResult, id: MOCK_ID_3});
    });
  });
});
