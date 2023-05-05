import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CreateOrderDto } from '@fit-friends/core';
import { IClientBalance, IOrder, OrderType } from '@fit-friends/shared-types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  public async createOrder(authHeader: string, newOrderDto: CreateOrderDto) {
    if (newOrderDto.type === OrderType.Training) {
      const { data: order } = await firstValueFrom(
        this.httpService
          .post<IOrder>(
            `${this.configService.get('service.orders')}/create`,
            newOrderDto,
            { headers: { authorization: authHeader }}
          )
      )

      if (order) {
        this.httpService.patch<IClientBalance>(
          `${this.configService.get('service.users')}/client-balance/add`,
          {
            serviceId: order.serviceId,
            quantity: order.quantity,
          },
          { headers: { authorization: authHeader }}
        )
      }

      return order;
    }

    this.httpService.patch<IClientBalance>(
      `${this.configService.get('service.users')}/client-balance/add`,
      {
        serviceId: newOrderDto.serviceId,
        quantity: newOrderDto.quantity
      },
      { headers: { authorization: authHeader }}
    )

    return 'Абонементы в спортзал успешно приобретены, баланс обновлён';
  }

  public async getOrder(orderId: number, authHeader: string) {
    return this.httpService
      .get<IOrder>(
        `${this.configService.get('service.orders')}/${orderId}`,
        { headers: { authorization: authHeader }}
      )
  }

  public async getOrders(query: string, authHeader: string) {
    return this.httpService
      .get<IOrder[]>(
        `${this.configService.get('service.orders')}/${query ? `?${query}` : ''}`,
        { headers: { authorization: authHeader }}
      )
  }
}
