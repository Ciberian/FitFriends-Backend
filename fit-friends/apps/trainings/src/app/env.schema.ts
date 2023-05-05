import * as Joi from 'joi';
import { DEFAULT_RABBIT_PORT } from './app.constant';

export default Joi.object({
  RABBIT_USER: Joi
    .string()
    .required(),
  RABBIT_PASSWORD: Joi
    .string()
    .required(),
  RABBIT_HOST: Joi
    .string()
    .hostname()
    .required(),
  RABBIT_PORT: Joi
    .number()
    .port()
    .default(DEFAULT_RABBIT_PORT)
    .required(),
  RABBIT_TRAININGS_SERVICE_QUEUE: Joi
    .string()
    .required(),
  AT_SECRET: Joi
    .string()
    .required(),
  FILES_UPLOAD_FOLDER: Joi
    .string()
    .required(),
});
