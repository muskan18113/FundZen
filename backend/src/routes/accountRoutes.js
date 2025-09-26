// src/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllAccounts,
  createAccount,
  updateAccount,
  deleteAccount
} = require('../controllers/accountController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// All routes here are protected
router.use(authMiddleware);

router.route('/')
  .get(getAllAccounts)
  .post(createAccount);

router.route('/:id')
  .put(updateAccount)
  .delete(deleteAccount);

module.exports = router;