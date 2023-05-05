import * as Joi from 'joi';

export default Joi.object({
  AT_SECRET: Joi
    .string()
    .required()
});
