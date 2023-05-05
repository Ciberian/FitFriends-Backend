import { ApiProperty } from '@nestjs/swagger';
import { IsNumber,  IsString, Length, Max, Min } from 'class-validator';
import { TrainingsErrorMessage } from '../../constants/trainings.constants';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Training id',
    example: 123,
    required: true,
  })
  @IsNumber()
  public trainingId!: number;

  @ApiProperty({
    description: 'Training rating',
    example: 4,
    required: true,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  public rating!: number;

  @ApiProperty({
    description: 'Training reveiw text',
    example: 'Эта тренировка для меня зарядка по утрам, помогает проснуться.',
    required: true,
  })
  @IsString()
  @Length(100, 1024, { message: TrainingsErrorMessage.ReviewLengthNotValid })
  public comment!: string;
}
