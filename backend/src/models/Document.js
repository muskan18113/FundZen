// src/models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true, trim: true },
  originalName: { type: String, required: true, trim: true },
  fileType: {
    type: String,
    enum: ['pdf', 'csv', 'xlsx', 'xls', 'jpg', 'jpeg', 'png'],
    required: true
  },
  fileSize: { type: Number, required: true },
  filePath: { type: String, required: true },
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'processed', 'failed'],
    default: 'uploaded'
  },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  transactionsExtracted: { type: Number, default: 0 },
}, { timestamps: true });

documentSchema.index({ userId: 1, createdAt: -1 });

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;s