import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderType, PaymentMethod } from '@fit-friends/shared-types';

export class OrderRdo {
  @ApiProperty({
    description: 'The uniq order ID',
    example: 123,
    required: true,
  })
  @Expose()
  public id!: number;

  @ApiProperty({
    description: 'Training or season pass to gym',
    example: 'Абонемент',
    enum: OrderType,
    required: true,
  })
  @Expose()
  public type!: OrderType;

  @ApiProperty({
    description: 'Training or gym id',
    example: 123,
    required: true,
  })
  @Expose()
  public serviceId!: number;

  @ApiProperty({
    description: 'Training or gym season pass price',
    example: 1234,
    required: true,
  })
  @Expose()
  public price!: number;

  @ApiProperty({
    description: 'Trainings quantity',
    example: 12,
    required: true,
  })
  @Expose()
  public quantity!: number;

  @ApiProperty({
    description: 'Total price',
    example: 14808,
    required: true,
  })
  @Expose()
  public totalPrice!: number;

  @ApiProperty({
    description: 'Payment method',
    example: 'Visa',
    enum: ['Visa',  'Mir', 'Umoney'],
    required: true,
  })
  @Expose()
  public paymentMethod!: PaymentMethod;

  @ApiProperty({
    description: 'Order creation date',
    example: '2023-03-28T16:14:35.132Z',
    required: true,
  })
  @Expose()
  public creationDate!: string;
}
