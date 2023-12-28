import Joi from "joi";

const passwordSchema = Joi.object({
  current_password: Joi.string().required(),
  new_password: Joi.string().required(),
  confirm_password: Joi.string().required(),
});

export { passwordSchema };
