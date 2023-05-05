import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';
import { UsersErrorMessage } from '../../constants/users.constants';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'User unique refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODA4MzUzMzIsImV4cCI6MTY4MTQ0MDEzMn0.LxfbYccBQEsg0-Mg_LB9gSdp1MizFY_A5SqfIlLjZK0',
    required: true,
  })
  @IsJWT({ message: UsersErrorMessage.JWTFormatNotValid })
  public refreshToken!: string;
}
