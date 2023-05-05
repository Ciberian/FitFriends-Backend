import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DayTrainingData } from '@fit-friends/shared-types';

export class TrainingDiaryRdo {
  @ApiProperty({
    description: 'The uniq training diary ID',
    example: '638348b04f5f6091439ea5b2',
    required: true,
  })
  @Transform((value) => value.obj._id.toString())
  @Expose({name: '_id'})
  public id!: string;

  @ApiProperty({
    description: 'Training data - training title, calories, duration, total calories',
    example: {
      trainingTitle: 'Crossfit',
      calories: 810,
      duration: '30-50 мин',
      totalCaloriesPerDay: 1860,
    },
    required: true,
  })
  @Expose()
  public mon!: DayTrainingData;

  @ApiProperty({
    description: 'Training data - training title, calories, duration, total calories',
    example: {
      trainingTitle: 'Crossfit',
      calories: 810,
      duration: '30-50 мин',
      totalCaloriesPerDay: 1860,
    },
    required: true,
  })
  @Expose()
  public tue!: DayTrainingData;

  @ApiProperty({
    description: 'Training data - training title, calories, duration, total calories',
    example: {
      trainingTitle: 'Crossfit',
      calories: 810,
      duration: '30-50 мин',
      totalCaloriesPerDay: 1860,
    },
    required: true,
  })
  @Expose()
  public wed!: DayTrainingData;

  @ApiProperty({
    description: 'Training data - training title, calories, duration, total calories',
    example: {
      trainingTitle: 'Crossfit',
      calories: 810,
      duration: '30-50 мин',
      totalCaloriesPerDay: 1860,
    },
    required: true,
  })
  @Expose()
  public thu!: DayTrainingData;

  @ApiProperty({
    description: 'Training data - training title, calories, duration, total calories',
    example: {
      trainingTitle: 'Crossfit',
      calories: 810,
      duration: '30-50 мин',
      totalCaloriesPerDay: 1860,
    },
    required: true,
  })
  @Expose()
  public fri!: DayTrainingData;

  @ApiProperty({
    description: 'Training data - training title, calories, duration, total calories',
    example: {
      trainingTitle: 'Crossfit',
      calories: 810,
      duration: '30-50 мин',
      totalCaloriesPerDay: 1860,
    },
    required: true,
  })
  @Expose()
  public sat!: DayTrainingData;

  @ApiProperty({
    description: 'Training data - training title, calories, duration, total calories',
    example: {
      trainingTitle: 'Crossfit',
      calories: 810,
      duration: '30-50 мин',
      totalCaloriesPerDay: 1860,
    },
    required: true,
  })
  @Expose()
  public sun!: DayTrainingData;

  @ApiProperty({
    description: 'Number of calories burned per week',
    example: 10605,
    required: true,
  })
  @Expose()
  public totalCaloriesPerWeek!: number;
}
