import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateNutritionDiaryDto {
  @ApiProperty({
    description: 'The number of calories consumed',
    example: 700,
  })
  @IsOptional()
  public breakfast?: number;

  @ApiProperty({
    description: 'The number of calories consumed',
    example: 700,
  })
  @IsOptional()
  public lunch?: number;

  @ApiProperty({
    description: 'The number of calories consumed',
    example: 700,
  })
  @IsOptional()
  public dinner?: number;

  @ApiProperty({
    description: 'The number of calories consumed',
    example: 700,
  })
  @IsOptional()
  public snack?: number;
}
