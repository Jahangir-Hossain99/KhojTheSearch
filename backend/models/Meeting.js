// models/Meeting.js
const mongoose = require('mongoose');

const MeetingParticipantSchema = new mongoose.Schema(
  {
    participantModel: { type: String, enum: ['User', 'Company'], required: true },
    participantType: { type: String, enum: ['user', 'company'], required: true },
    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'participantModel',
      required: true,
    },
    joinedAt: { type: Date },
    leftAt: { type: Date },
  },
  { _id: true }
);

const MeetingSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },

    // Creator
    createdByModel: { type: String, enum: ['User', 'Company'], required: true },
    createdByType: { type: String, enum: ['user', 'company'], required: true },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'createdByModel',
      required: true,
      index: true,
    },

    // Provider details (choose what you use; set to 'custom' if self-hosted)
    provider: {
      type: String,
      enum: ['jitsi', 'zoom', 'daily', 'agora', 'custom'],
      default: 'custom',
      index: true,
    },
    roomName: { type: String, trim: true },
    joinUrl: { type: String, trim: true },
    startTime: { type: Date },
    endTime: { type: Date },
    status: {
      type: String,
      enum: ['scheduled', 'live', 'ended', 'cancelled'],
      default: 'scheduled',
      index: true,
    },

    participants: { type: [MeetingParticipantSchema], default: [] },
  },
  { timestamps: true }
);

MeetingSchema.index({ conversationId: 1, startTime: -1 });
MeetingSchema.index({ status: 1, startTime: -1 });

MeetingSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
MeetingSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.models.Meeting || mongoose.model('Meeting', MeetingSchema);