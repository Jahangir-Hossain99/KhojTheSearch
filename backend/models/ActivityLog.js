// models/ActivityLog.js
const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema(
  {
    // Actor (dynamic principal)
    actorType: { type: String, enum: ['user', 'company', 'admin'], required: true },
    actorModel: { type: String, enum: ['User', 'Company', 'Admin'], required: true },
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'actorModel',
      required: true,
      index: true,
    },

    // Action
    action: {
      type: String,
      enum: [
        'job_view',
        'job_save',
        'job_apply',
        'application_status_change',
        'message_sent',
        'conversation_created',
        'profile_update',
        'job_created',
        'job_updated',
        'job_closed',
        'company_register',
        'user_register',
        'admin_action',
      ],
      required: true,
      index: true,
    },

    // Targets (optional, depends on action)
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', index: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', index: true },
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', index: true },
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true },

    // Arbitrary metadata (e.g., query params, client info)
    metadata: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

// Common query indexes
ActivityLogSchema.index({ actorId: 1, createdAt: -1 });
ActivityLogSchema.index({ action: 1, createdAt: -1 });

// Clean output
ActivityLogSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
ActivityLogSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports =
  mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);