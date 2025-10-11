// models/Conversation.js
const mongoose = require('mongoose');

/**
 * Participant subdocument
 * Supports both 'User' and 'Company' via refPath to `participantModel`
 */
const ParticipantSchema = new mongoose.Schema(
  {
    participantType: {
      type: String,
      enum: ['user', 'company'],
      required: true,
    },
    participantModel: {
      type: String,
      enum: ['User', 'Company'],
      required: true,
    },
    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'participantModel',
      required: true,
    },

    // Conversation-specific settings/state per participant
    role: {
      type: String,
      enum: ['owner', 'member', 'guest'],
      default: 'member',
    },
    isMuted: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    lastReadAt: { type: Date },
    lastReadMessageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  },
  { _id: true }
);

const ConversationSchema = new mongoose.Schema(
  {
    // Optional context
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', index: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', index: true },

    // Basic metadata
    subject: { type: String, trim: true },
    type: { type: String, enum: ['direct', 'group'], default: 'direct', index: true },

    // Participants (mixed principals)
    participants: { type: [ParticipantSchema], default: [] },

    // Creator info (dynamic ref)
    createdByType: { type: String, enum: ['user', 'company'], required: true },
    createdByModel: { type: String, enum: ['User', 'Company'], required: true },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'createdByModel',
      required: true,
      index: true,
    },

    // Activity tracking
    lastMessageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    lastMessageAt: { type: Date, index: true },
  },
  { timestamps: true }
);

// Helpful indexes
ConversationSchema.index({ 'participants.participantId': 1, updatedAt: -1 });
ConversationSchema.index({ type: 1, updatedAt: -1 });
ConversationSchema.index({ jobId: 1 });
ConversationSchema.index({ applicationId: 1 });

// Clean output
ConversationSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
ConversationSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports =
  mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);