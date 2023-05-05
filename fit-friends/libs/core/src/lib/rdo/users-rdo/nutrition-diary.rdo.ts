import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { NutritionData } from '@fit-friends/shared-types';

export class NutritionDiaryRdo {
  @ApiProperty({
    description: 'The uniq nutrition diary ID',
    example: '638348b04f5f6091439ea5b2',
    required: true,
  })
  @Transform((value) => value.obj._id.toString())
  @Expose({name: '_id'})
  public id!: string;

  @ApiProperty({
    description: 'This field shows how many calories were consumed during the day',
    example: {
      breakfast: 330,
      lunch: 560,
      dinner: 425,
      snack: 200,
      totalCaloriesPerDay: 1515,
      date: '2023-04-11T08:12:32.368Z',
    },
    required: true,
  })
  @Expose()
  public mon!: NutritionData;

  @ApiProperty({
    description: 'This field shows how many calories were consumed during the day',
    example: {
      breakfast: 330,
      lunch: 560,
      dinner: 425,
      snack: 200,
      totalCaloriesPerDay: 1515,
      date: '2023-04-11T08:12:32.368Z',
    },
    required: true,
  })
  @Expose()
  public tue!: NutritionData;

  @ApiProperty({
    description: 'This field shows how many calories were consumed during the day',
    example: {
      breakfast: 330,
      lunch: 560,
      dinner: 425,
      snack: 200,
      totalCaloriesPerDay: 1515,
      date: '2023-04-11T08:12:32.368Z',
    },
    required: true,
  })
  @Expose()
  public wed!: NutritionData;

  @ApiProperty({
    description: 'This field shows how many calories were consumed during the day',
    example: {
      breakfast: 330,
      lunch: 560,
      dinner: 425,
      snack: 200,
      totalCaloriesPerDay: 1515,
      date: '2023-04-11T08:12:32.368Z',
    },
    required: true,
  })
  @Expose()
  public thu!: NutritionData;

  @ApiProperty({
    description: 'This field shows how many calories were consumed during the day',
    example: {
      breakfast: 330,
      lunch: 560,
      dinner: 425,
      snack: 200,
      totalCaloriesPerDay: 1515,
      date: '2023-04-11T08:12:32.368Z',
    },
    required: true,
  })
  @Expose()
  public fri!: NutritionData;

  @ApiProperty({
    description: 'This field shows how many calories were consumed during the day',
    example: {
      breakfast: 330,
      lunch: 560,
      dinner: 425,
      snack: 200,
      totalCaloriesPerDay: 1515,
      date: '2023-04-11T08:12:32.368Z',
    },
    required: true,
  })
  @Expose()
  public sat!: NutritionData;

  @ApiProperty({
    description: 'This field shows how many calories were consumed during the day',
    example: {
      breakfast: 330,
      lunch: 560,
      dinner: 425,
      snack: 200,
      totalCaloriesPerDay: 1515,
      date: '2023-04-11T08:12:32.368Z',
    },
    required: true,
  })
  @Expose()
  public sun!: NutritionData;

  @ApiProperty({
    description: 'Number of calories consumed per week',
    example: 10605,
    required: true,
  })
  @Expose()
  public totalCaloriesPerWeek!: number;
}
