import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  Length,
  IsEnum,
  IsBoolean,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import {
  UserLevel,
  UserGender,
  TrainingType,
  TrainingDuration,
} from '@fit-friends/shared-types';
import { TrainingsErrorMessage } from '../../constants/trainings.constants';

export class UpdateTrainingDto {
  @ApiProperty({
    description: 'Training title',
    example: 'Crossfit',
    minLength: 1,
    maxLength: 15,
  })
  @IsOptional()
  @IsString()
  @Length(1, 15, { message: TrainingsErrorMessage.TrainingTitleLengthNotValid })
  public title?: string;

  @ApiProperty({
    description: 'Training image',
    example: 'training.png',
  })
  @IsOptional()
  @IsString()
  public image?: string;

  @ApiProperty({
    description: 'Training level',
    example: 'Любитель',
    enum: UserLevel,
  })
  @IsOptional()
  @IsEnum(UserLevel)
  public level?: UserLevel;

  @ApiProperty({
    description: 'Training type',
    example: 'Кроссфит',
    enum: TrainingType,
  })
  @IsOptional()
  @IsEnum(TrainingType)
  public type?: TrainingType;

  @ApiProperty({
    description: 'Training duration',
    example: '10-30 мин',
    enum: TrainingDuration,
  })
  @IsOptional()
  @IsEnum(TrainingDuration)
  public duration?: TrainingDuration;

  @ApiProperty({
    description: 'User gender',
    example: 'Мужчина',
    enum: UserGender,
  })
  @IsOptional()
  @IsEnum(UserGender)
  public gender?: UserGender;

  @ApiProperty({
    description: 'Calories to lose',
    example: 2500,
    minimum: 1000,
    maximum: 5000,
  })
  @IsOptional()
  @IsNumber()
  @Min(1000)
  @Max(5000)
  public caloriesToLose?: number;

  @ApiProperty({
    description: 'Training descripion',
    example:
      'Сложный комплекс упражнений на отработку показателей в классическом стиле.',
    minLength: 10,
    maxLength: 140,
  })
  @IsOptional()
  @IsString()
  @Length(10, 140, { message: TrainingsErrorMessage.TrainingDescriptionLengthNotValid })
  public description?: string;

  @ApiProperty({
    description: 'Training video',
    example: 'Crossfit.mp4',
  })
  @IsOptional()
  @IsString()
  public video?: string;

  @ApiProperty({
    description: 'Training price',
    example: 1234,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  public price?: number;

  @ApiProperty({
    description: 'Is special offer',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  public isSpecialOffer?: boolean;
}
