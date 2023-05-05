import * as Joi from 'joi';
import { DEFAULT_MONGO_DB_PORT } from './app.constant';

export default Joi.object({
  MONGO_DB: Joi
    .string()
    .required(),
  MONGO_HOST: Joi
    .string()
    .hostname()
    .required(),
  MONGO_PORT: Joi
    .number()
    .port()
    .default(DEFAULT_MONGO_DB_PORT)
    .required(),
  MONGO_USER: Joi
    .string()
    .required(),
  MONGO_PASSWORD: Joi
    .string(),
  MONGO_AUTH_BASE: Joi
    .string()
    .required(),
  AT_SECRET: Joi
    .string()
    .required(),
  AT_EXP: Joi
    .string()
    .optional(),
  RT_SECRET: Joi
    .string()
    .required(),
  RT_EXP: Joi
    .string()
    .optional(),
  FILES_UPLOAD_FOLDER: Joi
    .string()
    .required(),
});
