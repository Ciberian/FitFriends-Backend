import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OrderController],
  providers: [OrderRepository, OrderService, JwtService],
  exports: [OrderService, OrderRepository]
})
export class OrderModule {}
