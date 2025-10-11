const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
  title: { type: String, required: true, trim: true, index: true },
  description: { type: String, required: true },
  requirements: { type: [String], default: [] },
  employmentType: { type: String, enum: ['full_time','part_time','contract','internship','freelance'], index: true },
  seniority: { type: String, enum: ['intern','junior','mid','senior','lead'] },
  salary: { min: Number, max: Number, currency: { type: String, default: 'BDT' } },
  location: { country: String, city: String, remote: { type: Boolean, default: false } },
  tags: { type: [String], default: [], index: true },
  status: { type: String, enum: ['open','closed','draft'], default: 'open', index: true },
  publishedAt: Date,
  expiresAt: Date,
}, { timestamps: true });

JobSchema.index({ title: 'text', description: 'text', tags: 'text' });
JobSchema.index({ 'location.country': 1, 'location.city': 1, employmentType: 1, createdAt: -1 });

JobSchema.set('toJSON', { transform: (doc, ret) => { delete ret.__v; return ret; } });
JobSchema.set('toObject', { transform: (doc, ret) => { delete ret.__v; return ret; } });

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);