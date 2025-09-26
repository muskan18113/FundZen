// src/controllers/transactionController.js
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const Budget = require('../models/Budget');
const { transactionSchema } = require('../validators/transactionValidator');
const mongoose = require('mongoose');

// GET ALL TRANSACTIONS
exports.getAllTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, category, type, accountId } = req.query;
    const filter = { userId: req.userId };
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (accountId) filter.accountId = accountId;

    const transactions = await Transaction.find(filter)
      .populate('accountId', 'name bankName')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Transaction.countDocuments(filter);
    res.json({ 
        success: true, 
        data: { 
            transactions, 
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total
            } 
        } 
    });
  } catch (error) {
    next(error);
  }
};

// CREATE TRANSACTION
exports.createTransaction = async (req, res, next) => {
  try {
    const { error } = transactionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const account = await Account.findOne({ _id: req.body.accountId, userId: req.userId });
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    const transaction = new Transaction({ ...req.body, userId: req.userId });
    await transaction.save();

    if (transaction.type === 'income') {
      account.balance += transaction.amount;
    } else {
      account.balance -= transaction.amount;
      const budget = await Budget.findOne({ userId: req.userId, category: transaction.category, isActive: true });
      if (budget) {
        budget.spent += transaction.amount;
        await budget.save();
      }
    }
    await account.save();

    await transaction.populate('accountId', 'name bankName');
    res.status(201).json({ success: true, message: 'Transaction created', data: { transaction } });
  } catch (error) {
    next(error);
  }
};

// GET TRANSACTION BY ID
exports.getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.userId })
      .populate('accountId', 'name bankName');

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    res.json({ success: true, data: { transaction } });
  } catch (error) {
    next(error);
  }
};

// UPDATE TRANSACTION
exports.updateTransaction = async (req, res, next) => {
  try {
    const { error } = transactionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const oldTransaction = await Transaction.findOne({ _id: req.params.id, userId: req.userId });
    if (!oldTransaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    
    // 1. Reverse the financial impact of the OLD transaction
    const oldAccount = await Account.findById(oldTransaction.accountId);
    if (oldAccount) {
      if (oldTransaction.type === 'income') {
        oldAccount.balance -= oldTransaction.amount;
      } else {
        oldAccount.balance += oldTransaction.amount;
      }
      await oldAccount.save();
    }
    if (oldTransaction.type === 'expense') {
      const oldBudget = await Budget.findOne({ userId: req.userId, category: oldTransaction.category });
      if (oldBudget) {
        oldBudget.spent -= oldTransaction.amount;
        await oldBudget.save();
      }
    }

    // 2. Update the transaction document itself
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // 3. Apply the financial impact of the NEW transaction
    const newAccount = await Account.findById(updatedTransaction.accountId);
    if (newAccount) {
      if (updatedTransaction.type === 'income') {
        newAccount.balance += updatedTransaction.amount;
      } else {
        newAccount.balance -= updatedTransaction.amount;
      }
      await newAccount.save();
    }
    if (updatedTransaction.type === 'expense') {
      const newBudget = await Budget.findOne({ userId: req.userId, category: updatedTransaction.category });
      if (newBudget) {
        newBudget.spent += updatedTransaction.amount;
        await newBudget.save();
      }
    }

    await updatedTransaction.populate('accountId', 'name bankName');
    res.json({ success: true, message: 'Transaction updated successfully', data: { transaction: updatedTransaction } });
  } catch (error) {
    next(error);
  }
};

// DELETE TRANSACTION
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.userId });
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    // Reverse the financial impact on the associated account
    const account = await Account.findById(transaction.accountId);
    if (account) {
      if (transaction.type === 'income') {
        account.balance -= transaction.amount;
      } else {
        account.balance += transaction.amount;
      }
      await account.save();
    }

    // Reverse the impact on the associated budget if it's an expense
    if (transaction.type === 'expense') {
      const budget = await Budget.findOne({ userId: req.userId, category: transaction.category, isActive: true });
      if (budget && budget.spent >= transaction.amount) {
        budget.spent -= transaction.amount;
        await budget.save();
      }
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Transaction deleted successfully' });
  } catch (error) {
    next(error);
  }
};