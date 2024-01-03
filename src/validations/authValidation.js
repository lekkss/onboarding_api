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

const initializeSchema = Joi.object({
  phone: Joi.string().required(),
  country_code: Joi.string().required(),
});

const verifySchema = Joi.object({
  phone: Joi.string().required(),
  country_code: Joi.string().required(),
  otp: Joi.string()
    .required()
    .length(4)
    .pattern(/^[0-9]+$/),
});

const completeSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  password_confirmation: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password must match",
    }),
  type: Joi.string().valid("business", "personal").required(),
});

const resentOtpSchema = Joi.object({
  phone: Joi.string().required(),
  country_code: Joi.string().required(),
});

export {
  loginSchema,
  kycSchema,
  verifySchema,
  initializeSchema,
  resentOtpSchema,
  completeSignupSchema,
};
