import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IAlert,
  IClientProgress,
  MetroStation,
  TrainingDuration,
  TrainingType,
  UserGender,
  UserLevel,
  UserRole
} from '@fit-friends/shared-types';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class ClientRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '638348b04f5f6091439ea5b2',
    required: true,
  })
  @Transform((value) => value.obj._id.toString())
  @Expose({name: '_id'})
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
    example: 'Клиент',
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
    required: true,
  })
  @Expose()
  public friends!: string[];

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
  public trainingType!: TrainingType;

  @ApiProperty({
    description: 'Training duration',
    example: '10-30 мин',
    enum: TrainingDuration,
    required: true,
  })
  @Expose()
  public trainingDuration!: TrainingDuration;

  @ApiProperty({
    description: 'Calories to lose',
    example: 2000,
    required: true,
  })
  @Expose()
  public caloriesToLose!: number;

  @ApiProperty({
    description: 'Calories to lose per day',
    example: 2000,
    required: true,
  })
  @Expose()
  public caloriesToLosePerDay!: number;

  @ApiProperty({
    description: 'User short description about self',
    example: 'Привет! Я Вася и мне 20 лет. Обожаю спорт и все, что с ним связанно.',
    required: true,
  })
  @Expose()
  public description!: string;

  @ApiProperty({
    description: 'User readiness marker for training',
    example: true,
    required: true,
  })
  @Expose()
  public readyToTraining!: boolean;

  @ApiProperty({
    description: 'User favorite gyms IDs',
    example: [1, 3, 5, 6, 11, 15],
    required: true,
  })
  @Expose()
  public favoriteGyms!: number[];

  @ApiProperty({
    description: 'User nutrition diary ID',
    example: '528348b04f5f6091439ea5a1',
    required: true,
  })
  @Expose()
  public nutritionDiaryId!: Types.ObjectId;

  @ApiProperty({
    description: 'User training diary ID',
    example: '638348b04f5f6091439ea3b2',
    required: true,
  })
  @Expose()
  public trainingDiaryId!: Types.ObjectId;

  @ApiProperty({
    description: 'The user balance ID',
    example: '748348b04f5f6091439ea1c3',
    required: true,
  })
  @Expose()
  public balanceId!: Types.ObjectId;

  @ApiProperty({
    description: 'The user week progress',
    example: {},
    required: true,
  })
  @Expose()
  public clientProgress!: IClientProgress;

  @ApiProperty({
    description: 'User registration date',
    example: '2023-03-28T16:14:35.132Z',
    required: true,
  })
  @Expose()
  public registrationDate!: string;

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
