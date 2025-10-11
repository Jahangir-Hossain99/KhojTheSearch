// models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },

    // RBAC (simple)
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'moderator'],
      default: 'admin',
      index: true,
    },

    // Optional metadata
    lastLoginAt: { type: Date },
    status: { type: String, enum: ['active', 'suspended'], default: 'active', index: true },
  },
  { timestamps: true }
);

AdminSchema.index({ email: 1 }, { unique: true });

AdminSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

AdminSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const update = this.getUpdate() || {};
    const newPassword = update.password || (update.$set && update.$set.password);
    if (!newPassword) return next();

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);
    if (update.password) update.password = hashed;
    if (update.$set && update.$set.password) update.$set.password = hashed;

    this.setUpdate(update);
    next();
  } catch (err) {
    next(err);
  }
});

AdminSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

AdminSchema.methods.generateJWT = function () {
  return jwt.sign(
    { sub: this._id.toString(), type: 'admin', role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

AdminSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});
AdminSchema.set('toObject', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);