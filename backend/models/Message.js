// models/Message.js
const mongoose = require('mongoose');

/**
 * Attachment subdocument
 */
const AttachmentSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['image', 'video', 'audio', 'file', 'link'],
      default: 'file',
    },
    filename: { type: String, trim: true },
    mimeType: { type: String, trim: true },
    sizeBytes: { type: Number }, // optional size for files
    thumbnailUrl: { type: String, trim: true }, // for images/videos
  },
  { _id: true }
);

/**
 * Read receipt subdocument (per participant)
 */
const ReadReceiptSchema = new mongoose.Schema(
  {
    readerType: { type: String, enum: ['user', 'company'], required: true },
    readerModel: { type: String, enum: ['User', 'Company'], required: true },
    readerId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'readerModel',
      required: true,
    },
    readAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },

    // Sender (dynamic ref)
    senderType: { type: String, enum: ['user', 'company'], required: true },
    senderModel: { type: String, enum: ['User', 'Company'], required: true },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'senderModel',
      required: true,
      index: true,
    },

    // Content
    text: { type: String, trim: true },
    attachments: { type: [AttachmentSchema], default: [] },

    // Delivery state
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
      index: true,
    },

    // Read receipts per participant (optional; can also rely on Conversation.participants.lastReadAt)
    reads: { type: [ReadReceiptSchema], default: [] },

    // Optional linkage back to job/application context
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', index: true },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', index: true },
  },
  { timestamps: true }
);

// Indexes to support chat listing and search
MessageSchema.index({ conversationId: 1, createdAt: 1 });
MessageSchema.index({ senderId: 1, createdAt: -1 });

// Clean output
MessageSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
MessageSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.models.Message || mongoose.model('Message', MessageSchema);