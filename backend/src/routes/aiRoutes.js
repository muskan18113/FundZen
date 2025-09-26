// src/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/aiController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// All routes here are protected
router.use(authMiddleware);

router.post('/chat', chatWithAI);

module.exports = router;