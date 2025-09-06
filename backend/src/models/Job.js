const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // company user
  location: String,
  salary: { min: Number, max: Number },
  jobType: { type: String, enum: ['full-time','part-time','contract','internship','remote'] },
  requirements: [String],
  status: { type: String, enum: ['open','closed','filled'], default: 'open' },
  postedAt: { type: Date, default: Date.now },
  applicantsCount: { type: Number, default: 0 }
});

// text index for search
jobSchema.index({ title: 'text', description: 'text', requirements: 'text' });

module.exports = mongoose.model('Job', jobSchema);
