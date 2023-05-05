import { OrderType } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateClientBalanceDto {
  @ApiProperty({
    description: 'Type of order, training or season pass to gym',
    example: 'Тренировка',
    enum: OrderType,
    required: true,
  })
  @IsEnum(OrderType)
  public type: OrderType;

  @ApiProperty({
    description: 'A unique training or season pass ID',
    example: 12,
    required: true,
  })
  @IsNumber()
  public serviceId: number;

  @ApiProperty({
    description: 'Number of trainings or season pass purchased',
    example: 10,
    required: true,
  })
  @IsNumber()
  public quantity!: number;
}
