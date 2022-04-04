import joi from "joi";

export const registerSchema = joi.object({
  name: joi.string().min(2).max(20).trim().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .lowercase(),
  password: joi.string().required(),
});

export const loginSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .lowercase(),
  password: joi.string().required(),
});
