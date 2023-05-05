import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChangeFavoriteGymsDto {
  @ApiProperty({
    description: 'A unique gym ID',
    example: 1,
    required: true,
  })
  @IsNumber()
  public gymId: number;
}
