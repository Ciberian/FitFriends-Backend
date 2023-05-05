import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('tokens', () => ({
  at_secret: process.env.AT_SECRET,
  at_exp: process.env.AT_EXP,
  rt_secret: process.env.RT_SECRET,
  rt_exp: process.env.RT_EXP
}));
