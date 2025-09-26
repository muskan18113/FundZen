// src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTransactions,
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// All routes here are protected
router.use(authMiddleware);

router.route('/')
  .get(getAllTransactions)
  .post(createTransaction);

router.route('/:id')
  .get(getTransactionById)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;