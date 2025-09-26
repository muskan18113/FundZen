// src/controllers/userController.js
const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Joi = require('joi');
const mongoose = require('mongoose');

exports.updateUserProfile = async (req, res, next) => {
  try {
    const updateUserSchema = Joi.object({
      firstName: Joi.string().trim().max(50).optional(),
      lastName: Joi.string().trim().max(50).optional(),
      phone: Joi.string().trim().optional(),
      // Add other fields as needed
    });

    const { error } = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const user = await User.findByIdAndUpdate(req.userId, { $set: req.body }, { new: true });
    res.json({ success: true, message: 'Profile updated', data: { user: user.toJSON() } });
  } catch (error) {
    next(error);
  }
};

exports.getDashboardData = async (req, res, next) => {
  try {
    const accounts = await Account.find({ userId: req.userId, isActive: true });
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    const recentTransactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 }).limit(5);

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const monthlyStats = await Transaction.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.userId), date: { $gte: startOfMonth } } },
        { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]);

    const budgets = await Budget.find({ userId: req.userId, isActive: true }).limit(4);

    let monthlyIncome = monthlyStats.find(s => s._id === 'income')?.total || 0;
    let monthlyExpenses = monthlyStats.find(s => s._id === 'expense')?.total || 0;

    res.json({
      success: true,
      data: {
        totalBalance,
        monthlyIncome,
        monthlyExpenses,
        recentTransactions,
        budgets,
      }
    });
  } catch (error) {
    next(error);
  }
};