import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  UserLevel,
  UserGender,
  TrainingType,
  TrainingDuration,
} from '@fit-friends/shared-types';

export class TrainingRdo {
  @ApiProperty({
    description: 'The uniq training ID',
    example: 123,
    required: true,
  })
  @Expose()
  public id!: number;

  @ApiProperty({
    description: 'Training title',
    example: 'Crossfit',
    required: true,
  })
  @Expose()
  public title!: string;

  @ApiProperty({
    description: 'Training image',
    example: 'training.png',
    required: true,
  })
  @Expose()
  public image!: string;

  @ApiProperty({
    description: 'Training level',
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
  public type!: TrainingType;

  @ApiProperty({
    description: 'Training duration',
    example: '10-30 мин',
    enum: TrainingDuration,
    required: true,
  })
  @Expose()
  public duration!: TrainingDuration;


  @ApiProperty({
    description: 'User gender',
    example: 'Мужчина',
    enum: UserGender,
    required: true,
  })
  @Expose()
  public gender!: UserGender;

  @ApiProperty({
    description: 'Calories to lose',
    example: 1000,
    required: true,
  })
  @Expose()
  public caloriesToLose!: number;

  @ApiProperty({
    description: 'Training descripion',
    example: 'Сложный комплекс упражнений на отработку показателей в классическом стиле.',
    required: true,
  })
  @Expose()
  public description!: string;

  @ApiProperty({
    description: 'Training video',
    example: 'Crossfit.mp4',
    required: true,
  })
  @Expose()
  public video!: string;

  @ApiProperty({
    description: 'Training price',
    example: 1234,
    required: true,
  })
  @Expose()
  public price!: number;

  @ApiProperty({
    description: 'Training average rating',
    example: 4.3,
    required: true,
  })
  @Expose()
  public rating!: number;

  @ApiProperty({
    description: 'Trainer id',
    example: '641f201dc6f05672f00a72fd',
    required: true,
  })
  @Expose()
  public trainer!: string;

  @ApiProperty({
    description: 'Is special offer',
    example: true,
    required: true,
  })
  @Expose()
  public isSpecialOffer!: boolean;
}
