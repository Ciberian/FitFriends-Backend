import { ApiProperty } from '@nestjs/swagger';

export class UserTrainingsDto {
  @ApiProperty({
    description: 'Trainings ID on user balance',
    example: [1, 3, 5, 12],
    required: true,
  })
  public trainingsOnUserBalance: number[];
}
