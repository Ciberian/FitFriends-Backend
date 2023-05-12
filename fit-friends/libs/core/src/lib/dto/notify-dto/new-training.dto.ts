import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { TrainingType, UserGender, UserLevel } from '@fit-friends/shared-types';

export class NewTrainingDto {
  @IsString()
  title: string;

  @IsEnum(UserLevel)
  level: UserLevel;

  @IsIn([ 'Йога', 'Бег', 'Бокс', 'Стрейчинг', 'Кроссфит', 'Аэробика', 'Пилатес'])
  type: TrainingType;

  @IsEnum(UserGender)
  gender: UserGender;

  @IsNumber()
  caloriesToLose: number;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  trainer: string;
}
