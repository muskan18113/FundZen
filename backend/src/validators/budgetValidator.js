// src/validators/budgetValidator.js
const Joi = require('joi');

const budgetValidationSchema = Joi.object({
  category: Joi.string().required().trim(),
  allocated: Joi.number().required().min(0),
  period: Joi.string().valid('weekly', 'monthly', 'quarterly', 'yearly').default('monthly'),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  color: Joi.string().valid('blue', 'green', 'purple', 'orange', 'red', 'yellow', 'pink', 'indigo').default('blue'),
  alertThreshold: Joi.number().min(0).max(100).default(80),
  notes: Joi.string().trim().max(500).optional().allow('')
});

module.exports = { budgetValidationSchema };