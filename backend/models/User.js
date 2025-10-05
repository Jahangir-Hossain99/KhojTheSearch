// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Needed for password hashing

const UserSchema = new mongoose.Schema({
    // Authentication Fields
    email: { // Used for both personal and official company email
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'] 
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false // Ensures password is NOT returned in query results by default
    },

    // Role Differentiation (Crucial)
    role: {
        type: String,
        enum: ['jobseeker', 'employer'],
        default: 'jobseeker',
        required: [true, 'User role is required']
    },

    // Link to Profile (Dynamically references JobSeekerProfile or EmployerProfile)
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'role', 
        required: false
    }
}, {
    timestamps: true 
});

// Middleware for password hashing before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare entered password with hash
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);