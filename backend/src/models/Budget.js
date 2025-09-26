// src/models/Budget.js
const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true, trim: true },
  allocated: { type: Number, required: true, min: 0 },
  spent: { type: Number, default: 0, min: 0 },
  period: { type: String, enum: ['weekly', 'monthly', 'quarterly', 'yearly'], default: 'monthly' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  color: {
    type: String,
    enum: ['blue', 'green', 'purple', 'orange', 'red', 'yellow', 'pink', 'indigo'],
    default: 'blue'
  },
  isActive: { type: Boolean, default: true },
  alertThreshold: { type: Number, default: 80, min: 0, max: 100 },
}, { timestamps: true });

budgetSchema.index({ userId: 1, category: 1 });

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;