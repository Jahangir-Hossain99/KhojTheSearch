// models/SystemSettings.js
const mongoose = require('mongoose');

const LimitsSchema = new mongoose.Schema(
  {
    maxAvatarMB: { type: Number, default: 2 },
    maxResumeMB: { type: Number, default: 10 },
    maxMessageAttachments: { type: Number, default: 5 },
    maxJobsPerCompany: { type: Number, default: 100 },
  },
  { _id: false }
);

const FeatureFlagsSchema = new mongoose.Schema(
  {
    messagingEnabled: { type: Boolean, default: true },
    videoCallingEnabled: { type: Boolean, default: false },
    notificationsEnabled: { type: Boolean, default: true },
    applicationsEnabled: { type: Boolean, default: true },
    jobPostingEnabled: { type: Boolean, default: true },
    registrationEnabled: { type: Boolean, default: true },
    maintenanceMode: { type: Boolean, default: false },
  },
  { _id: false }
);

const BrandingSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'Khoj The Job', trim: true },
    defaultCurrency: { type: String, default: 'BDT', trim: true },
    logoUrl: { type: String, trim: true },
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
  },
  { _id: false }
);

const LegalSchema = new mongoose.Schema(
  {
    termsUrl: { type: String, trim: true },
    privacyUrl: { type: String, trim: true },
    contactEmail: { type: String, trim: true },
  },
  { _id: false }
);

const SystemSettingsSchema = new mongoose.Schema(
  {
    version: { type: Number, default: 1, index: true }, // bump when you change
    featureFlags: { type: FeatureFlagsSchema, default: () => ({}) },
    limits: { type: LimitsSchema, default: () => ({}) },
    branding: { type: BrandingSchema, default: () => ({}) },
    legal: { type: LegalSchema, default: () => ({}) },

    // Optional: email sending/defaults (non-secrets)
    mail: {
      defaultFrom: { type: String, trim: true, default: 'no-reply@khojthejob.com' },
      templates: {
        welcomeUserTemplateId: { type: String, trim: true },
        welcomeCompanyTemplateId: { type: String, trim: true },
        applicationReceivedTemplateId: { type: String, trim: true },
      },
    },

    // Audit
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    modifiedAt: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

// Useful indexes
SystemSettingsSchema.index({ version: -1, updatedAt: -1 });

// Clean output
SystemSettingsSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
SystemSettingsSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

// Guarded export
module.exports =
  mongoose.models.SystemSettings || mongoose.model('SystemSettings', SystemSettingsSchema);