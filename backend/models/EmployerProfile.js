// models/EmployerProfile.js
const mongoose = require('mongoose');

const EmployerProfileSchema = new mongoose.Schema({
    // Link back to the main User
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    // 1. Company Identity (Moved from User.js)
    companyName: { type: String, required: true, trim: true }, // The company's name
    recruiterName: { type: String }, // Name of the contact person/recruiter

    // 2. Business Details
    industry: { type: String },
    companySize: { type: String },
    companyDescription: { type: String },

    // 3. Contact & Web Info
    companyWebsite: { type: String },
    companyAddress: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('EmployerProfile', EmployerProfileSchema);