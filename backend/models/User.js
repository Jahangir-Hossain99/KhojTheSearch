const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true,
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i, 'Please enter a valid email address'] },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['jobseeker'], default: 'jobseeker', index: true },
  fullName: { type: String, required: true, trim: true },
  status: { type: String, enum: ['active','suspended','unverified'], default: 'unverified', index: true },
  phone: String,
  address: String,
  aboutme: String,
  linkedin: String,
  workexperience: [{
    jobTitle: {type: String, required: true},
    company: { type: String, required: true },
    company: String,
  }],
  educations: [{
    degree: {type: String, required: true},
    institution: { type: String, required: true },
    years: String
  }],
  skills: [String],
  avatar: {URL: String, fileName: String},
  resume: {URL: String, fileName: String},
});

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate() || {};
  const newPassword = update.password || (update.$set && update.$set.password);
  if (!newPassword) return next();
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(newPassword, salt);
  if (update.password) update.password = hashed;
  if (update.$set && update.$set.password) update.$set.password = hashed;
  this.setUpdate(update);
  next();
});

UserSchema.methods.matchPassword = function(pwd) { return bcrypt.compare(pwd, this.password); };
UserSchema.methods.generateJWT = function() {
  return jwt.sign({ sub: this._id.toString(), type: 'user', role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

UserSchema.set('toJSON', { transform: (doc, ret) => { delete ret.password; delete ret.__v; return ret; } });
UserSchema.set('toObject', { transform: (doc, ret) => { delete ret.password; delete ret.__v; return ret; } });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);