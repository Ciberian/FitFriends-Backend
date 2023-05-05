import { Test } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserRole } from '@fit-friends/shared-types';
import { TrainingsTest } from '../app.constant';

describe('OrderController', () => {
  let orderController: OrderController;
  const mockOrderService = {
    createOrder: jest.fn(() => TrainingsTest.OrderResult),
    getOrder: jest.fn(() => TrainingsTest.OrderResult),
    getOrders: jest.fn(() => [TrainingsTest.OrderResult]),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile();

    orderController = module.get<OrderController>(OrderController);
  });

  describe('createOrder', () => {
    it('should return order', async () => {
      expect(await orderController
        .create(TrainingsTest.OrderDto, UserRole.Client))
        .toEqual(TrainingsTest.OrderResult);
    });
  });

  describe('showOneOrder', () => {
    it('should return the order by its ID', async () => {
      expect(await orderController.show(1, UserRole.Client)).toEqual(TrainingsTest.OrderResult);
    });
  });

  describe('showOrders', () => {
    it('should return an array of orders', async () => {
      expect(await orderController.index({quantitySortDirection: 'asc'}, TrainingsTest.User)).toEqual([TrainingsTest.OrderResult]);
    });
  });
});
