const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
  applicantUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  resumeUrl: { type: String, trim: true },
  coverLetter: { type: String, trim: true },
  status: { type: String, enum: ['submitted','in_review','interview','offer','rejected','withdrawn'], default: 'submitted', index: true },
}, { timestamps: true });

ApplicationSchema.index({ jobId: 1, applicantUserId: 1 }, { unique: true });
ApplicationSchema.index({ applicantUserId: 1, createdAt: -1 });

ApplicationSchema.set('toJSON', { transform: (doc, ret) => { delete ret.__v; return ret; } });
ApplicationSchema.set('toObject', { transform: (doc, ret) => { delete ret.__v; return ret; } });

module.exports = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);