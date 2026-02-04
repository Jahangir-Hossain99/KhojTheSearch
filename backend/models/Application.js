const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
  jobPosition: { type: String, required: true, trim: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
  status: { type: String, enum: ['submitted','in_review','interview','offer','rejected','withdrawn'], default: 'submitted', index: true },
}, { timestamps: true });

ApplicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });
ApplicationSchema.index({ applicantId: 1, createdAt: -1 });

ApplicationSchema.set('toJSON', { transform: (doc, ret) => { delete ret.__v; return ret; } });
ApplicationSchema.set('toObject', { transform: (doc, ret) => { delete ret.__v; return ret; } });

module.exports = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);