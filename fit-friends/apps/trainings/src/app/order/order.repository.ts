import { Injectable } from '@nestjs/common';
import { ICRUDRepository } from '@fit-friends/core';
import { OrderEntity } from './order.entity';
import { OrderQuery } from './query/order.query';
import { OrderQueryValue } from '../app.constant';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from '@prisma/client-trainings';
import { Types } from 'mongoose';

@Injectable()
export class OrderRepository
  implements ICRUDRepository<OrderEntity, number, Order>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(order: OrderEntity): Promise<Order> {
    return this.prisma.order.create({
      data: { ...order.toObject() },
    });
  }

  public async findById(id: number): Promise<Order | null> {
    return this.prisma.order.findFirst({
      where: { id: id },
    });
  }

  public async find(
    {
      quantitySortDirection = OrderQueryValue.DefaultSortDirection,
      totalPriceSortDirection = OrderQueryValue.DefaultSortDirection,
    }: OrderQuery,
    trainerId: Types.ObjectId
  ): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { trainerId: String(trainerId) },
      orderBy: [
        { quantity: quantitySortDirection },
        { totalPrice: totalPriceSortDirection },
      ],
    });
  }

  public async update(id: number, item: OrderEntity): Promise<Order> {
    return this.prisma.order.update({
      where: { id: id },
      data: { ...item },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}
