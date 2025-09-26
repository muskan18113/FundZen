// src/validators/transactionValidator.js
const Joi = require('joi');

const transactionSchema = Joi.object({
  name: Joi.string().required().trim().max(100),
  amount: Joi.number().required().greater(0),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().required().trim(),
  subcategory: Joi.string().trim().optional().allow(''),
  accountId: Joi.string().hex().length(24).required(), // Validates MongoDB ObjectId
  description: Joi.string().trim().max(500).optional().allow(''),
  date: Joi.date().optional(),
  tags: Joi.array().items(Joi.string().trim()).optional(),
  isRecurring: Joi.boolean().optional(),
  recurringFrequency: Joi.string().valid('daily', 'weekly', 'monthly', 'yearly').optional(),
  location: Joi.string().trim().optional().allow(''),
  paymentMethod: Joi.string().valid('cash', 'card', 'upi', 'netbanking', 'cheque', 'other').optional()
});

module.exports = { transactionSchema };