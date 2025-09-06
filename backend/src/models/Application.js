const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUrl: String,
  coverLetter: String,
  status: { type: String, enum: ['applied','reviewing','interview','offer','rejected'], default: 'applied' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

applicationSchema.index({ job: 1, user: 1 }, { unique: true }); // prevent duplicate apply

module.exports = mongoose.model('Application', applicationSchema);
