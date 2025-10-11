const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const CompanySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true,
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i, 'Please enter a valid email address'] },
  password: { type: String, required: true, minlength: 6, select: false },
  name: { type: String, required: true, trim: true, index: true },
  website: { type: String, trim: true },
  logoUrl: { type: String, trim: true },
  industry: { type: String, trim: true },
  size: { type: String, enum: ['1-10','11-50','51-200','201-500','501-1000','1001+'] },
  about: { type: String, trim: true },
  address: { type: String, trim: true },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

CompanySchema.index({ email: 1 }, { unique: true });

CompanySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

CompanySchema.pre('findOneAndUpdate', async function(next) {
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

CompanySchema.methods.matchPassword = function(pwd) { return bcrypt.compare(pwd, this.password); };
CompanySchema.methods.generateJWT = function() {
  return jwt.sign({ sub: this._id.toString(), type: 'company' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

CompanySchema.set('toJSON', { transform: (doc, ret) => { delete ret.password; delete ret.__v; return ret; } });
CompanySchema.set('toObject', { transform: (doc, ret) => { delete ret.password; delete ret.__v; return ret; } });

module.exports = mongoose.models.Company || mongoose.model('Company', CompanySchema);