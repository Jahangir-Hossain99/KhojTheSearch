// models/Notification.js
const mongoose = require('mongoose');

/**
 * Notification schema supports both User and Company recipients
 * and optionally links to job/application/conversation/message context.
 */
const NotificationSchema = new mongoose.Schema(
  {
    // Recipient (dynamic ref)
    recipientType: { type: String, enum: ['user', 'company'], required: true, index: true },
    recipientModel: { type: String, enum: ['User', 'Company'], required: true },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'recipientModel',
      required: true,
      index: true,
    },

    // Actor (who triggered the notification) - optional
    actorType: { type: String, enum: ['user', 'company'], required: false },
    actorModel: { type: String, enum: ['User', 'Company'], required: false },
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'actorModel',
      required: false,
      index: true,
    },

    // Category & type (used to render specific UI or emails)
    category: {
      type: String,
      enum: ['message', 'job', 'application', 'system'],
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        // message
        'message_new',
        'message_read',
        // job
        'job_published',
        'job_closed',
        'job_updated',
        // application
        'application_submitted',
        'application_status_changed',
        // system
        'system_alert',
        'system_announcement',
      ],
      required: true,
      index: true,
    },

    // Content
    title: { type: String, required: true, trim: true },
    body: { type: String, required: false, trim: true },

    // Deep link target for UI (optional)
    link: {
      url: { type: String, trim: true },
      label: { type: String, trim: true },
    },

    // Related entities (optional)
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', index: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', index: true },
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', index: true },
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', index: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },

    // Channel + status
    channel: {
      type: String,
      enum: ['inapp', 'email', 'push', 'sms'],
      default: 'inapp',
      index: true,
    },
    status: {
      type: String,
      enum: ['queued', 'sent', 'delivered', 'read', 'archived'],
      default: 'queued',
      index: true,
    },

    // Timing
    sentAt: { type: Date },
    deliveredAt: { type: Date },
    readAt: { type: Date },
    scheduledAt: { type: Date }, // for scheduled sends
    expiresAt: { type: Date },   // optional TTL

    // Importance / UX hints
    important: { type: Boolean, default: false, index: true },

    // Deduplication key (avoid duplicates of same event for same recipient)
    dedupeKey: { type: String, trim: true, index: true },

    // Arbitrary payload for renderers/templates
    data: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Optional error tracking for delivery failures
    error: {
      code: { type: String, trim: true },
      message: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

// Indexes for common queries
NotificationSchema.index({ recipientId: 1, createdAt: -1 });
NotificationSchema.index({ recipientId: 1, status: 1, createdAt: -1 });
NotificationSchema.index({ category: 1, type: 1, createdAt: -1 });
NotificationSchema.index({ important: 1, createdAt: -1 });
// Optional TTL: uncomment to auto-delete at expiresAt
// NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Prevent duplicates for the same recipient+dedupeKey (when provided)
NotificationSchema.index({ recipientId: 1, dedupeKey: 1 }, { unique: true, sparse: true });

// Helpers (optional but handy)
NotificationSchema.statics.markRead = async function (notificationId, opts = {}) {
  const update = { status: 'read', readAt: new Date() };
  return this.findByIdAndUpdate(notificationId, update, { new: true });
};

NotificationSchema.statics.markAllReadForRecipient = async function (recipientId) {
  return this.updateMany(
    { recipientId, status: { $ne: 'read' } },
    { $set: { status: 'read', readAt: new Date() } }
  );
};

NotificationSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
NotificationSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports =
  mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);