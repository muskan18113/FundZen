// src/controllers/budgetController.js
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const { budgetValidationSchema } = require('../validators/budgetValidator');

exports.getAllBudgets = async (req, res, next) => {
    try {
        const budgets = await Budget.find({ userId: req.userId }).sort({ createdAt: -1 });

        // Optionally, update spent amount in real-time
        for (let budget of budgets) {
            const result = await Transaction.aggregate([
                { $match: { userId: budget.userId, category: budget.category, type: 'expense', date: { $gte: budget.startDate, $lte: budget.endDate } } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]);
            budget.spent = result.length > 0 ? result[0].total : 0;
        }

        res.json({ success: true, data: { budgets } });
    } catch (error) {
        next(error);
    }
};

exports.createBudget = async (req, res, next) => {
    try {
        const { error } = budgetValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const budget = new Budget({ ...req.body, userId: req.userId });
        await budget.save();
        res.status(201).json({ success: true, message: 'Budget created', data: { budget } });
    } catch (error) {
        next(error);
    }
};

// ... Add other controllers for Update and Delete ...