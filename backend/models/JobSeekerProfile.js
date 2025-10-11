const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  years: { type: String, trim: true },
  description: { type: String, trim: true },
}, { _id: true });

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true, trim: true },
  institution: { type: String, required: true, trim: true },
  years: { type: String, trim: true },
}, { _id: true });

const JobSeekerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  fullName: { type: String, required: true, trim: true },
  title: { type: String, trim: true },
  about: { type: String, trim: true },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  linkedin: { type: String, trim: true },
  avatarUrl: { type: String, trim: true },
  resumeUrl: { type: String, trim: true },
  skills: {
    type: [String], default: [],
    set: (arr) => Array.isArray(arr)
      ? [...new Set(arr.map(s => typeof s === 'string' ? s.trim() : s))].filter(Boolean)
      : [],
  },
  experience: { type: [ExperienceSchema], default: [] },
  education: { type: [EducationSchema], default: [] },
  visibility: { type: String, enum: ['public','private','recruiters_only'], default: 'public', index: true },
}, { timestamps: true });

JobSeekerProfileSchema.index({ user: 1 });
JobSeekerProfileSchema.index({ skills: 1 });
JobSeekerProfileSchema.index({ fullName: 'text', title: 'text', about: 'text' });

JobSeekerProfileSchema.set('toJSON', { transform: (doc, ret) => { delete ret.__v; return ret; } });
JobSeekerProfileSchema.set('toObject', { transform: (doc, ret) => { delete ret.__v; return ret; } });

module.exports = mongoose.models.JobSeekerProfile || mongoose.model('JobSeekerProfile', JobSeekerProfileSchema);