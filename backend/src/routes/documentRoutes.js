// src/routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllDocuments,
  uploadDocument,
  downloadDocument
} = require('../controllers/documentController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/uploadMiddleware');

// All routes here are protected
router.use(authMiddleware);

router.get('/', getAllDocuments);
router.post('/upload', upload.single('document'), uploadDocument);
router.get('/:id/download', downloadDocument);

module.exports = router;