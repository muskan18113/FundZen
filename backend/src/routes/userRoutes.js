// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { updateUserProfile, getDashboardData } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// All routes here are protected
router.use(authMiddleware);

router.put('/profile', updateUserProfile);
router.get('/dashboard', getDashboardData);

module.exports = router;