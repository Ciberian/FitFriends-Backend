import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from '@fit-friends/shared-types';
import { Types } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('tokens.at_secret')
    });
  }

  async validate({ sub, email, role, name, avatar, favoriteGyms }:
    Pick<IUser, 'email' | 'role' | 'name' | 'avatar'> & {sub: string, favoriteGyms: number[]}) {
    return { id: new Types.ObjectId(sub), email, role, name, avatar, favoriteGyms };
  }
}
