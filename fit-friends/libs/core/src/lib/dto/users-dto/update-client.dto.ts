import {
  IsEmail,
  IsISO8601,
  IsString,
  IsOptional,
  Length,
  IsEnum,
  IsNumber,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UsersErrorMessage } from '../../constants/users.constants';
import {
  UserLevel,
  MetroStation,
  UserGender,
  UserRole,
  TrainingType,
  TrainingDuration,
} from '@fit-friends/shared-types';

export class UpdateClientDto {
  @ApiProperty({
    description: 'User name',
    example: 'Вася',
    required: true,
    minLength: 1,
    maxLength: 15,
  })
  @IsOptional()
  @IsString()
  @Length(1, 15, { message: UsersErrorMessage.NameLengthNotValid })
  public name?: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru',
  })
  @IsOptional()
  @IsEmail({}, { message: UsersErrorMessage.EmailNotValid })
  public email?: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Мужчина',
    enum: UserGender,
  })
  @IsOptional()
  @IsEnum(UserGender)
  public gender?: UserGender;

  @ApiProperty({
    description: 'User role',
    example: 'Тренер',
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole)
  public role?: UserRole;

  @ApiProperty({
    description: 'The nearest metro station to the place of training',
    example: 'Пионерская',
    enum: MetroStation,
  })
  @IsOptional()
  @IsEnum(MetroStation)
  public location?: MetroStation;

  @ApiProperty({
    description: 'User birth date',
    example: '2000-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsISO8601({ message: UsersErrorMessage.BirthDateNotValid })
  public birthDate?: Date;

  @ApiProperty({
    description: 'User avatar',
    example: 'my-avatar.png',
  })
  @IsOptional()
  @IsString()
  public avatar?: string;

  @ApiProperty({
    description: 'User level',
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
  public trainingType?: TrainingType;

  @ApiProperty({
    description: 'Training duration',
    example: '10-30 мин',
    enum: TrainingDuration,
  })
  @IsOptional()
  @IsEnum(TrainingDuration)
  public trainingDuration?: TrainingDuration;

  @ApiProperty({
    description: 'Calories to lose',
    example: 2000,
    minimum: 1000,
    maximum: 5000,
  })
  @IsOptional()
  @IsNumber()
  @Min(1000)
  @Max(5000)
  public caloriesToLose?: number;

  @ApiProperty({
    description: 'Calories to lose per day',
    example: 2000,
    minimum: 1000,
    maximum: 5000,
  })
  @IsOptional()
  @IsNumber()
  @Min(1000)
  @Max(5000)
  public caloriesToLosePerDay?: number;

  @ApiProperty({
    description: 'User readiness marker for training',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  public readyToTraining?: boolean;
}
