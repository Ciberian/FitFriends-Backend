import { Test } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { UserRole } from '@fit-friends/shared-types';
import { TrainingsTest } from '../app.constant';

describe('OrderService', () => {
  let orderService: OrderService;
  const mockOrderRepository = {
    find: jest.fn(() => [TrainingsTest.OrderResult]),
    create: jest.fn(() => TrainingsTest.OrderResult),
    findById: jest.fn(() => TrainingsTest.OrderResult),
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [OrderService, OrderRepository],
    })
      .overrideProvider(OrderRepository)
      .useValue(mockOrderRepository)
      .compile();

    orderService = app.get<OrderService>(OrderService);
  });

  describe('createOrder', () => {
    it('should return new order', async () => {
      expect(await orderService
        .createOrder(UserRole.Client, TrainingsTest.OrderDto))
        .toEqual(TrainingsTest.OrderResult);
    });
  });

  describe('getOneOrder', () => {
    it('should return the order by its ID', async () => {
      expect(await orderService.getOrder(1, UserRole.Trainer)).toEqual(TrainingsTest.OrderResult);
    });
  });

  describe('getOrders', () => {
    it('should return an array of orders', async () => {
      expect(await orderService.getOrders({quantitySortDirection: 'asc'}, TrainingsTest.User.id, UserRole.Trainer)).toEqual([TrainingsTest.OrderResult]);
    });
  });
});
