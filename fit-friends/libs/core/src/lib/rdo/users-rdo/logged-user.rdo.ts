import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@fit-friends/shared-types';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '638348b04f5f6091439ea5b2',
    required: true,
  })
  @Transform((value) => value.obj._id.toString())
  @Expose({name: '_id'})
  public id!: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
    required: true,
  })
  @Expose()
  public email!: string;

  @ApiProperty({
    description: 'User role',
    example: 'Клиент',
    enum: UserRole,
    required: true,
  })
  @Expose()
  public role!: UserRole;

  @ApiProperty({
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDI5ZDgzMmZhZjgwYWU3MDYzMjNhNDciLCJlbWFpbCI6ImNsaWVudDFAZ21haWwuY29tIiwicm9sZSI6ItCa0LvQuNC10L3RgiIsIm5hbWUiOiLQmNCy0LDQvSIsImlhdCI6MTY4MDgyMjU2NSwiZXhwIjoxNjgwODIzNDY1fQ.r3KVDTmzNyi4-Kf3XDUcG56nqtZvBeqgqcomWplEFzY',
    required: true,
  })
  @Expose({name: 'access_token'})
  public accessToken!: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODA4MjI1NjUsImV4cCI6MTY4MTQyNzM2NX0.WV7XaK2CdnupydrioiP_w6k3jpjgd40IrpV1JKU4HZc',
    required: true,
  })
  @Expose({name: 'refresh_token'})
  public refreshToken!: string;
}
