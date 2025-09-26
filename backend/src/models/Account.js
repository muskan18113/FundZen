// src/models/Account.js
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  type: {
    type: String,
    enum: ['savings', 'current', 'investment', 'credit_card', 'cash', 'other'],
    required: true
  },
  balance: { type: Number, required: true, default: 0 },
  accountNumber: { type: String, required: true, trim: true },
  bankName: { type: String, required: true, trim: true },
  ifscCode: { type: String, trim: true },
  color: {
    type: String,
    enum: ['blue', 'green', 'purple', 'orange', 'red', 'yellow', 'pink', 'indigo'],
    default: 'blue'
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Mask account number for security
accountSchema.methods.getMaskedAccountNumber = function() {
  const accountNum = this.accountNumber;
  if (accountNum.length <= 4) return accountNum;
  return '****' + accountNum.slice(-4);
};

accountSchema.index({ userId: 1, isActive: 1 });

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;