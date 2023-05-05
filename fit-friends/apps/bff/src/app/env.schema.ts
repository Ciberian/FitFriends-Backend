import * as Joi from 'joi';

export const envSchema = Joi.object({
  USERS_SERVICE_URL: Joi
    .string()
    .required(),
  TRAININGS_SERVICE_URL: Joi
    .string()
    .required(),
  ORDERS_SUBSERVICE_URL: Joi
    .string()
    .required(),
  REVIEWS_SUBSERVICE_URL: Joi
    .string()
    .required(),
  GYMS_SERVICE_URL: Joi
    .string()
    .required(),
  NOTIFY_SERVICE_URL: Joi
    .string()
    .required(),
});
