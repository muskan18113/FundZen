// src/routes/budgetRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllBudgets,
  createBudget,
  updateBudget,
  deleteBudget
} = require('../controllers/budgetController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// All routes here are protected
router.use(authMiddleware);

router.route('/')
  .get(getAllBudgets)
  .post(createBudget);

router.route('/:id')
  .put(updateBudget)
  .delete(deleteBudget);

module.exports = router;