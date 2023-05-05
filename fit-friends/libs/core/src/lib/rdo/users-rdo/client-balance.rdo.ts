import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GymsData, TrainingsData } from '@fit-friends/shared-types';

export class ClientBalanceRdo {
  @ApiProperty({
    description: 'The uniq client balance ID',
    example: '638348b04f5f6091439ea5b2',
    required: true,
  })
  @Transform((value) => value.obj._id.toString())
  @Expose({name: '_id'})
  public id!: string;

  @ApiProperty({
    description: 'Available trainins purchased by the user',
    example: [{
        trainingId: 12,
        availableTrainingsCount: 4,
      }, {
        trainingId: 2,
        availableTrainingsCount: 14,
      }
    ],
    required: true,
  })
  @Expose()
  public trainings!: TrainingsData[];

  @ApiProperty({
    description: 'Available seasonpass to gyms purchased by the user',
    example: [{
      gymId: 77,
      seasonPassCount: 41,
    }, {
      gymId: 8,
      seasonPassCount: 24,
    }
  ],
    required: true,
  })
  @Expose()
  public gyms!: GymsData[];
}
