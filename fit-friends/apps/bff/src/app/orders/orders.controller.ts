import {
  Get,
  Body,
  Post,
  Param,
  Headers,
  Controller,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CreateOrderDto, OrderRdo, parseQueryFromUrl } from '@fit-friends/core';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.CREATED,
    description: 'The new order has been successfully created.',
  })
  public async create(
    @Body() dto: CreateOrderDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.ordersService.createOrder(authHeader, dto);
  }

  @Get(':id')
  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'The order has been successfully found.',
  })
  public async show(
    @Param('id') orderId: number,
    @Headers('authorization') authHeader: string
  ) {
    return await this.ordersService.getOrder(orderId, authHeader);
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
  public async index(
    @Req() req: Request,
    @Headers('authorization') authHeader: string
  ) {
    const query = parseQueryFromUrl(req.url);

    return await this.ordersService.getOrders(query, authHeader);
  }
}
