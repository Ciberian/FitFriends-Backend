import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewRdo {
  @ApiProperty({
    description: 'Review author name',
    example: 'Татьяна',
    required: true,
  })
  @Expose()
  public authorName!: string;

  @ApiProperty({
    description: 'Review author avatar',
    example: 'avatar.png',
    required: true,
  })
  @Expose()
  public authorAvatar!: string;

  @ApiProperty({
    description: 'Training id',
    example: 123,
    required: true,
  })
  @Expose()
  public trainingId!: number;

  @ApiProperty({
    description: 'Training rating',
    example: 4,
    required: true,
  })
  @Expose()
  public rating!: number;

  @ApiProperty({
    description: 'Training review text',
    example: 'Хорошая тренировка, но все же не хватило немного динамики. Для меня оказалась слишком легкой.',
    required: true,
  })
  @Expose()
  public comment!: string;

  @ApiProperty({
    description: 'Review creation date',
    example: '2023-03-28T16:14:35.132Z',
    required: true,
  })
  @Expose()
  public creationDate!: string;
}
