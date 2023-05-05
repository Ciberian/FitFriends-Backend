import {
  Get,
  Body,
  Post,
  Param,
  Query,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import {
  User,
  fillDTO,
  JwtAuthGuard,
  CreateOrderDto,
  OrderRdo,
} from '@fit-friends/core';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderQuery } from './query/order.query';
import { ITokenPayload } from '@fit-friends/shared-types';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.CREATED,
    description: 'The new order has been successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  public async create(@Body() dto: CreateOrderDto, @User('role') userRole) {
    const newOrder = await this.orderService.createOrder(userRole, dto);

    return fillDTO(OrderRdo, newOrder);
  }

  @Get(':id')
  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The order has been successfully found.',
  })
  @UseGuards(JwtAuthGuard)
  public async show(@Param('id') orderId: number, @User('role') userRole) {
    const order = await this.orderService.getOrder(orderId, userRole);

    return fillDTO(OrderRdo, order);
  }

  @Get('/')
  @ApiResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(OrderRdo) },
    },
    status: HttpStatus.OK,
    description: 'Orders found',
  })
  @UseGuards(JwtAuthGuard)
  public async index(@Query() query: OrderQuery, @User() user: ITokenPayload) {
    const { id, role } = user;
    const orders = await this.orderService.getOrders(query, id, role);

    return orders.map((order) => fillDTO(OrderRdo, order));
  }
}
