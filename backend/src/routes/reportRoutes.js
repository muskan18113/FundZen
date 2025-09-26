// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const { getFinancialOverview } = require('../controllers/reportController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// All routes here are protected
router.use(authMiddleware);

router.get('/overview', getFinancialOverview);

module.exports = router;