import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthErrorMessage } from '../../app.constant';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    if ('authorization' in req.headers) {
      const authorization = req.headers.authorization;
      const token = authorization.replace('Bearer', '').trim();
      const secret = this.configService.get('tokens.at_secret');

      verify(token, secret, (err: unknown) => {
        if (err) {
          throw new ForbiddenException(AuthErrorMessage.WrongAccessToken);
        }

        res.status(208).json({ access_token: token });
      });
    } else {
      next();
    }
  }
}
