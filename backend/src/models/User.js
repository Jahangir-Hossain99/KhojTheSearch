const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: String, title: String, from: Date, to: Date, description: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['jobseeker','company','admin'], required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },

  // jobseeker fields
  resumeUrl: String,
  skills: [String],
  experience: [experienceSchema],
  education: [{ school: String, degree: String, year: Number }],

  // company fields (if role === 'company')
  companyName: String,
  companyBio: String,
  logoUrl: String,

  preferences: {
    locations: [String],
    jobTypes: [String],
    salaryRange: { min: Number, max: Number }
  },

  createdAt: { type: Date, default: Date.now }
});

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
