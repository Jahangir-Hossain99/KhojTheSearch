// models/JobSeekerProfile.js
const mongoose = require('mongoose');

// --- Sub-Schemas for Arrays ---
const ExperienceSchema = new mongoose.Schema({
    id: { type: Number },
    title: { type: String, required: true },
    company: { type: String, required: true },
    years: { type: String }, 
    description: { type: String }
});

const EducationSchema = new mongoose.Schema({
    id: { type: Number },
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    years: { type: String }
});


// --- Main Job Seeker Profile Schema ---
const JobSeekerProfileSchema = new mongoose.Schema({
    // Link back to the main User
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    // 1. Identity & Core Profile Fields (Moved from User.js)
    fullName: { type: String, required: true, trim: true }, // The person's name
    title: { type: String }, // Job headline
    about: { type: String },
    
    // 2. Contact Fields
    phone: { type: String },
    address: { type: String },
    linkedin: { type: String },

    // 3. Array Fields (The Resume Data)
    skills: [String],
    experience: [ExperienceSchema],
    education: [EducationSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('JobSeekerProfile', JobSeekerProfileSchema);