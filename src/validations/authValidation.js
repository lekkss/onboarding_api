import Joi from "joi";
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const kycSchema = Joi.object({
  firstname: Joi.string().required(),
  middlename: Joi.string().required(),
  lastname: Joi.string().required(),
  dob: Joi.string().required(),
  bvn: Joi.string().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  postal_code: Joi.string().required(),
  address: Joi.string().required(),
  document_type_id: Joi.string().required(),
  document_number: Joi.string().required(),
});

const verifySchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/),
});

export { loginSchema, kycSchema, verifySchema };
