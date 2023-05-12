import {
  IsEmail,
  IsISO8601,
  IsString,
  IsAlphanumeric,
  IsOptional,
  Length,
  IsEnum,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UsersErrorMessage } from '../../constants/users.constants';
import {
  UserLevel,
  MetroStation,
  UserGender,
  UserRole,
  TrainingType,
} from '@fit-friends/shared-types';

export class CreateTrainerDto {
  @ApiProperty({
    description: 'User name',
    example: 'Вася',
    minLength: 1,
    maxLength: 15,
    required: true,
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
    minLength: 6,
    maxLength: 12,
    required: true,
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
    example: 'Тренер',
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
    required: true,
  })
  @IsIn([ 'Йога', 'Бег', 'Бокс', 'Стрейчинг', 'Кроссфит', 'Аэробика', 'Пилатес'])
  public trainingType!: TrainingType[];

  @ApiProperty({
    description: 'Trainer certificates',
    example: ['certificate.pdf'],
    required: true,
  })
  @IsString()
  public certificates!: string[];

  @ApiProperty({
    description: 'Trainer merits',
    example:
      'Персональный тренер и инструктор групповых программ с опытом  более 4х лет.',
    minLength: 10,
    maxLength: 140,
    required: true,
  })
  @IsString()
  @Length(10, 140, { message: UsersErrorMessage.MeritsLengthNotValid })
  public merits!: string;

  @ApiProperty({
    description: 'Trainer readiness marker for personal training',
    example: true,
    required: true,
  })
  @IsBoolean()
  public personalTraining!: boolean;
}
