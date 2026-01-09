const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: false, index: true },
  companyName:{type:String,required:false},
  position: { type: String, required: false, trim: true, index: true },
  description: { type: String, required: false },
  requirements: { type: String },
  employmentType: { type: String, enum: ['Full-Time','Part-Time','Contract','Internship','Freelance'], index: true },
  seniority: { type: String, enum: ['Intern','Junior','Mid','Senior','Lead'] },
  salary: { type: String, currency: { type: String, default: 'BDT' } },
  location: { type:String },
  tags: [String],
  status: { type: String, enum: ['Active','Inactive'], default: 'Active', index: true },
  publishedAt: Date,
  expiresAt: Date,
}, { timestamps: true });

JobSchema.index({ position: 'text', description: 'text', tags: 'text' });
JobSchema.index({ 'location.country': 1, 'location.city': 1, employmentType: 1, createdAt: -1 });

JobSchema.set('toJSON', { transform: (doc, ret) => { delete ret.__v; return ret; } });
JobSchema.set('toObject', { transform: (doc, ret) => { delete ret.__v; return ret; } });

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);