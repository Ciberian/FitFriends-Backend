import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class RequestToUserDto {
  @ApiProperty({
    description: 'A unique user ID',
    example: '641f201dc6f05672f00a72fd',
    required: true,
  })
  @Transform(({ obj }) => new Types.ObjectId(obj.userId))
  public userId: Types.ObjectId;
}
