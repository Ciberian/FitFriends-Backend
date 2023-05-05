import {
  IsEmail,
  IsISO8601,
  IsString,
  IsAlphanumeric,
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

export class CreateClientDto {
  @ApiProperty({
    description: 'User name',
    example: 'Вася',
    required: true,
    minLength: 1,
    maxLength: 15,
  })
  @IsString()
  @Length(1, 15, { message: UsersErrorMessage.NameLengthNotValid })
  public name!: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru',
    required: true,
  })
  @IsEmail({}, { message: UsersErrorMessage.EmailNotValid })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty12345',
    required: true,
    minLength: 6,
    maxLength: 12,
  })
  @IsAlphanumeric()
  @Length(6, 12, { message: UsersErrorMessage.PasswordNotValid })
  public password!: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Мужчина',
    enum: UserGender,
    required: true,
  })
  @IsEnum(UserGender)
  public gender!: UserGender;

  @ApiProperty({
    description: 'User role',
    example: 'Клиент',
    enum: UserRole,
    required: true,
  })
  @IsEnum(UserRole)
  public role!: UserRole;

  @ApiProperty({
    description: 'The nearest metro station to the place of training',
    example: 'Пионерская',
    enum: MetroStation,
    required: true,
  })
  @IsEnum(MetroStation)
  public location!: MetroStation;

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
    required: true,
  })
  @IsEnum(UserLevel)
  public level!: UserLevel;

  @ApiProperty({
    description: 'Training type',
    example: 'Кроссфит',
    enum: TrainingType,
    required: true,
  })
  @IsEnum(TrainingType)
  public trainingType!: TrainingType;

  @ApiProperty({
    description: 'Training duration',
    example: '10-30 мин',
    enum: TrainingDuration,
    required: true,
  })
  @IsEnum(TrainingDuration)
  public trainingDuration!: TrainingDuration;

  @ApiProperty({
    description: 'Calories to lose',
    example: 2000,
    minimum: 1000,
    maximum: 5000,
    required: true,
  })
  @IsNumber()
  @Min(1000)
  @Max(5000)
  public caloriesToLose!: number;

  @ApiProperty({
    description: 'Calories to lose per day',
    example: 2000,
    minimum: 1000,
    maximum: 5000,
    required: true,
  })
  @IsNumber()
  @Min(1000)
  @Max(5000)
  public caloriesToLosePerDay!: number;

  @ApiProperty({
    description: 'Trainer merits',
    example:
      'Привет! Я Катерина и мне 27 лет.Обожаю спорт и все, что с ним связанно.',
    minLength: 10,
    maxLength: 140,
    required: true,
  })
  @IsString()
  @Length(10, 140, { message: UsersErrorMessage.DescriptionLengthNotValid })
  public description!: string;

  @ApiProperty({
    description: 'User readiness marker for training',
    example: true,
    required: true,
  })
  @IsBoolean()
  public readyToTraining!: boolean;
}
