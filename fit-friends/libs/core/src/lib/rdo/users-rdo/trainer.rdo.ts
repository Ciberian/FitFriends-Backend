import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IAlert,
  MetroStation,
  TrainingType,
  UserGender,
  UserLevel,
  UserRole
} from '@fit-friends/shared-types';
import { IsOptional } from 'class-validator';

export class TrainerRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '638348b04f5f6091439ea5b2',
    required: true,
  })
  @Transform((value) => value.obj._id.toString())
  @Expose({ name: '_id'})
  public id!: string;

  @ApiProperty({
    description: 'User name',
    example: 'Вася',
    required: true,
  })
  @Expose()
  public name!: string;

  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru',
    required: true,
  })
  @Expose()
  public email!: string;

  @ApiProperty({
    description: 'User gender',
    example: 'Мужчина',
    enum: UserGender,
    required: true,
  })
  @Expose()
  public gender!: UserGender;

  @ApiProperty({
    description: 'User role',
    example: 'Тренер',
    enum: UserRole,
    required: true,
  })
  @Expose()
  public role!: UserRole;

  @ApiProperty({
    description: 'The nearest metro station to the place of training',
    example: 'Пионерская',
    enum: MetroStation,
    required: true,
  })
  @Expose()
  public location!: MetroStation;

  @ApiProperty({
    description: 'User birth date',
    example: '2000-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @Expose()
  public birthDate?: Date;

  @ApiProperty({
    description: 'User avatar',
    example: 'my-avatar.png',
    required: true,
  })
  @Expose()
  public avatar!: string;

  @ApiProperty({
    type: [String],
    description: 'User friends IDs',
    example: ['418348a04f5f6091439ea5a7', '528348c04f5f6091439ea5d3'],
  })
  @IsOptional()
  @Expose()
  public friends?: string[];

  @ApiProperty({
    description: 'User level',
    example: 'Любитель',
    enum: UserLevel,
    required: true,
  })
  @Expose()
  public level!: UserLevel;

  @ApiProperty({
    description: 'Training type',
    example: 'Кроссфит',
    enum: TrainingType,
    required: true,
  })
  @Expose()
  public trainingType: TrainingType;

  @ApiProperty({
    description: 'Trainer certificate',
    example: 'certificate.pdf',
    required: true,
  })
  @Expose()
  public certificate!: string;

  @ApiProperty({
    description: 'Trainer merits',
    example: 'certificate.pdf',
    required: true,
  })
  @Expose()
  public merits!: string;

  @ApiProperty({
    description: 'Trainer readiness marker for personal training',
    example: true,
    required: true,
  })
  @Expose()
  public personalTraining!: boolean;

  @ApiProperty({
    description: 'User registration date',
    example: '2023-03-18T13:31:41.444Z',
    required: true,
  })
  @Expose()
  public registrationDate: string;

  @ApiProperty({
    description: 'User alerts',
    example: [{
      text: 'Марк добавил вас в друзья',
      date: '2023-04-25T14:07:27.554Z',
    }],
    required: true,
  })
  @Expose()
  public alerts!: IAlert[];
}
