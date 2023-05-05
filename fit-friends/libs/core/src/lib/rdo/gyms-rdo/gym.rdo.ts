import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GymFeature, MetroStation } from '@fit-friends/shared-types';

export class GymRdo {
  @ApiProperty({
    description: 'The uniq gym ID',
    example: 12,
    required: true,
  })
  @Expose()
  public id!: number;

  @ApiProperty({
    description: 'The gym title',
    example: 'World Sport',
    required: true,
  })
  @Expose()
  public title!: string;

  @ApiProperty({
    description: 'Nearest metro station to the gym',
    example: 'Спортивная',
    enum: MetroStation,
    required: true,
  })
  @Expose()
  public location!: MetroStation;

  @ApiProperty({
    description: 'A marker that shows whether or not the gym is verified',
    example: true,
    required: true,
  })
  @Expose()
  public isVerified!: boolean;

  @ApiProperty({
    description: 'Features of the gym',
    example: ['Бассейн', 'Массаж'],
    required: true,
  })
  @Expose()
  public gymFeatures!: GymFeature[];

  @ApiProperty({
    description: 'The gym photos',
    example: ['photo1.png', 'photo2.png'],
    required: true,
  })
  @Expose()
  public photos!: string[];

  @ApiProperty({
    description: 'The gym description',
    example: 'Огромный зал с отдельной зоной кроссфит. Разнообразное оборудование для занятий практически любым видом спорта.',
    required: true,
  })
  @Expose()
  public description!: string;

  @ApiProperty({
    description: 'The price of a season pass to the gym',
    example: 800,
    required: true,
  })
  @Expose()
  public price!: number;

  @ApiProperty({
    description: 'Gym creation date',
    example: '2023-03-28T16:14:35.132Z',
    required: true,
  })
  @Expose()
  public registerDate!: string;
}
