// models/SavedJob.js
const mongoose = require('mongoose');

const SavedJobSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
    notes: { type: String, trim: true }, // optional personal note
  },
  { timestamps: true }
);

// Prevent saving the same job twice for the same user
SavedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });

SavedJobSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
SavedJobSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.models.SavedJob || mongoose.model('SavedJob', SavedJobSchema);