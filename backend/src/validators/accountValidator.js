// src/validators/accountValidator.js
const Joi = require('joi');

const accountValidationSchema = Joi.object({
  name: Joi.string().required().trim().max(100),
  type: Joi.string().valid('savings', 'current', 'investment', 'credit_card', 'cash', 'other').required(),
  balance: Joi.number().required().default(0),
  accountNumber: Joi.string().required().trim(),
  bankName: Joi.string().required().trim(),
  ifscCode: Joi.string().trim().optional().allow(''),
  color: Joi.string().valid('blue', 'green', 'purple', 'orange', 'red', 'yellow', 'pink', 'indigo').default('blue'),
  description: Joi.string().trim().max(500).optional().allow('')
});

module.exports = { accountValidationSchema };