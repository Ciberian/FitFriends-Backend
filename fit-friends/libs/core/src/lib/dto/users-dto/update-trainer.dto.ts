import {
  IsEmail,
  IsISO8601,
  IsString,
  IsOptional,
  Length,
  IsEnum,
  IsBoolean,
  IsIn,
} from 'class-validator';
import {
  UserLevel,
  MetroStation,
  UserGender,
  UserRole,
  TrainingType,
} from '@fit-friends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { UsersErrorMessage } from '../../constants/users.constants';

export class UpdateTrainerDto {
  @ApiProperty({
    description: 'User name',
    example: 'Вася',
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
  @IsISO8601()
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
  })
  @IsOptional()
  @IsIn([ 'Йога', 'Бег', 'Бокс', 'Стрейчинг', 'Кроссфит', 'Аэробика', 'Пилатес'])
  public trainingType?: TrainingType[];

  @ApiProperty({
    description: 'Trainer certificate',
    example: 'certificate.pdf',
  })
  @IsOptional()
  @IsString()
  public certificate?: string;

  @ApiProperty({
    description: 'Trainer merits',
    example: 'certificate.pdf',
    minLength: 10,
    maxLength: 140,
  })
  @IsOptional()
  @IsString()
  @Length(10, 140, { message: UsersErrorMessage.MeritsLengthNotValid })
  public merits?: string;

  @ApiProperty({
    description: 'Trainer readiness marker for personal training',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  public personalTraining?: boolean;
}
