import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, Length } from 'class-validator';
import { UsersErrorMessage } from '../../constants/users.constants';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User old password',
    example: 'abcdef123',
    minLength: 6,
    maxLength: 12,
    required: true,
  })
  @IsAlphanumeric()
  @Length(6, 12, { message: UsersErrorMessage.PasswordNotValid })
  public oldPassword!: string;

  @ApiProperty({
    description: 'User new password',
    example: '321fedcba',
    minLength: 6,
    maxLength: 12,
    required: true,
  })
  @IsAlphanumeric()
  @Length(6, 12, { message: UsersErrorMessage.PasswordNotValid })
  public newPassword!: string;
}
