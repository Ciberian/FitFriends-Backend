import { ApiProperty } from '@nestjs/swagger';
import { OrderType } from '@fit-friends/shared-types';
import {
  IsIn,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Training or season pass to gym',
    example: 'Абонемент',
    enum: OrderType,
    required: true,
  })
  @IsEnum(OrderType)
  public type!: OrderType;

  @ApiProperty({
    description: 'Training or gym id',
    example: 123,
    required: true,
  })
  @IsNumber()
  public serviceId!: number;

  @ApiProperty({
    description: 'Trainer ID, who created training',
    example: '641f201dc6f05672f00a72fd',
    required: true,
  })
  @IsOptional()
  @IsString()
  public trainerId: string;

  @ApiProperty({
    description: 'Training or gym season pass price',
    example: 1234,
    required: true,
  })
  @IsNumber()
  @Min(0)
  public price!: number;

  @ApiProperty({
    description: 'Trainings quantity',
    example: 12,
    minimum: 1,
    required: true,
  })
  @IsNumber()
  @Min(1)
  public quantity!: number;

  @ApiProperty({
    description: 'Payment method',
    example: 'Visa',
    enum: ['Visa',  'Mir', 'Umoney'],
    required: true,
  })
  @IsIn(['Visa',  'Mir', 'Umoney'])
  public paymentMethod!: "Visa" | "Mir" | "Umoney";
}
