import { TrainingDuration } from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class UpdateTrainingDiaryDto {
  @ApiProperty({
    description: 'The training title',
    example: 'Crossfit',
    required: true,
  })
  @IsString()
  public trainingTitle: string;

  @ApiProperty({
    description: 'The number of calories spent',
    example: 700,
    required: true,
  })
  @IsNumber()
  public calories: number;

  @ApiProperty({
    description: 'Training duration',
    example: '10-30 мин',
    enum: TrainingDuration,
    required: true,
  })
  @IsEnum(TrainingDuration)
  public duration!: TrainingDuration;
}
