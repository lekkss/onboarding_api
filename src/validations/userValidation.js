import Joi from "joi";

const passwordSchema = Joi.object({
  current_password: Joi.string().required(),
  new_password: Joi.string().required(),
  confirm_password: Joi.string()
    .valid(Joi.ref("new_password"))
    .required()
    .messages({
      "any.only": "Password must match",
    }),
});

export { passwordSchema };
