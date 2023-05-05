import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUser } from '@fit-friends/shared-types';

@Injectable()
export class RTStrategy extends PassportStrategy(Strategy, 'rt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('tokens.rt_secret'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, { email, role, name }: Pick<IUser, 'email' | 'role' | 'name'>) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    return { email, role, name, refreshToken };
  }
}
