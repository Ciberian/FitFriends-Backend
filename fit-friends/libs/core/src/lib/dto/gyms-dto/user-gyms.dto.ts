import { ApiProperty } from '@nestjs/swagger';

export class UserGymsDto {
  @ApiProperty({
    description: 'Gym ID on user balance',
    example: [1, 3, 5, 12],
    required: true,
  })
  public gymsOnUserBalance: number[];
}
