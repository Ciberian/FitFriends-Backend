import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from '@fit-friends/core';
import { IOrder, UserRole } from '@fit-friends/shared-types';
import { OrderEntity } from './order.entity';
import { OrderQuery } from './query/order.query';
import { OrderErrorMessage } from '../app.constant';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  public async createOrder(userRole: UserRole, dto: CreateOrderDto) {
    if (userRole !== UserRole.Client) {
      throw new ForbiddenException(OrderErrorMessage.WrongUserRole);
    }

    const { type, serviceId, price, quantity, paymentMethod } = dto;

    const order: IOrder = {
      type,
      serviceId,
      trainerId: dto?.trainerId || '',
      price,
      quantity,
      totalPrice: price * quantity,
      paymentMethod,
      creationDate: new Date()
    };

    const orderEntity = new OrderEntity(order);

    return await this.orderRepository.create(orderEntity);
  }

  public async getOrder(id: number, userRole: UserRole) {
    if (userRole !== UserRole.Trainer) {
      throw new ForbiddenException(OrderErrorMessage.AccessDenied);
    }

    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Order with id - ${id}, not found`);
    }

    return order;
  }

  public async getOrders(query: OrderQuery, trainerId: Types.ObjectId, userRole: UserRole) {
    if (userRole !== UserRole.Trainer) {
      throw new ForbiddenException(OrderErrorMessage.AccessDenied);
    }

    return await this.orderRepository.find(query, trainerId)
  }
}
