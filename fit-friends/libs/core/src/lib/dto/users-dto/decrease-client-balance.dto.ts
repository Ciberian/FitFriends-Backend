import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DecreaseClientBalanceDto {

  @ApiProperty({
    description: 'A unique training ID',
    example: 12,
    required: true,
  })
  @IsNumber()
  public trainingId: number;
}
