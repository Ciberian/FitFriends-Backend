import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsAlphanumeric, Length } from 'class-validator';
import { UsersErrorMessage } from '../../constants/users.constants';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru',
    required: true,
  })
  @IsEmail({}, { message: UsersErrorMessage.EmailNotValid })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'qwerty12345',
    minLength: 6,
    maxLength: 12,
    required: true,
  })
  @IsAlphanumeric()
  @Length(6, 12, { message: UsersErrorMessage.PasswordNotValid })
  public password!: string;
}
