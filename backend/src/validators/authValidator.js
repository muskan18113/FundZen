// src/validators/authValidator.js
const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string().required().trim().max(50),
  lastName: Joi.string().required().trim().max(50),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().required().trim(),
  address: Joi.string().trim().optional().allow('')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };