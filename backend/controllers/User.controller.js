const user = require( '../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const Job = require('../models/Job.js');
const Company = require('../models/Company.js')
const Application = require('../models/Application.js');


async function createUser(req, res) {
    const avatar = req.files.avatar ? req.files.avatar[0] : null;
    const resume = req.files.resume ? req.files.resume[0] : null;
    const avatarUrl = avatar ? { URL: `/public/avatars/${avatar.filename}`, fileName: avatar.filename } : null;
    const resumeUrl = resume ? { URL: `/public/resumes/${resume.filename}`, fileName: resume.filename } : null;

    const { email, password, fullName, phone, address, aboutme, linkedin, experience, education, skills } = req.body;

    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const newUser = new user({
            email,
            password,
            fullName,
            phone,
            address,
            aboutme,
            linkedin,
            experience: experience ? JSON.parse(experience) : [],
            education: education ? JSON.parse(education) : [],
            skills: skills ? skills.split(',').map(s => s.trim()).filter(s => s.length) : [],
            avatarUrl: avatarUrl,
            resumeUrl: resumeUrl
        });
        console.log('New User Data:', newUser);
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in createUser:', error);
        return res.status(500).json({ message: 'Server error' });
    }


}


const getUserProfile = (req, res)=>{
    const userId = req.params.userId;
    user.findById(userId)
    .then(userData=>{
        if(!userData){
            return  res.status(404).json({message:'User not found'});
        }
        res.status(200).json(userData);
    }
    ).catch(error=>{
        console.error('Error in getUserProfile:', error);
        res.status(500).json({message:'Server error'});
    });
}

const updateUserProfile = async (req, res) => {
    const userId = req.body._id;
    const avatar = req.files.avatar ? req.files.avatar[0] : null;
    const resume = req.files.resume ? req.files.resume[0] : null;
    const avatarUrl = avatar ? { URL: `/public/avatars/${avatar.filename}`, fileName: avatar.filename } : null;
    const resumeUrl = resume ? { URL: `/public/resumes/${resume.filename}`, fileName: resume.filename } : null;
    const { fullName, phone, address, aboutme, linkedin, experience, education, skills } = req.body;

    try {
        const updateData = {
            fullName,
            phone,
            address,
            aboutme,
            linkedin,
            experience: experience ? JSON.parse(experience) : [],
            education: education ? JSON.parse(education) : [],
            skills: skills ? skills.split(',').map(s => s.trim()).filter(s => s.length) : [],
        };
        if (avatarUrl) updateData.avatarUrl = avatarUrl;
        if (resumeUrl) updateData.resumeUrl = resumeUrl;
        const updatedUser = await user.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error in updateUserProfile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await user.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error in deleteUser:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { createUser, getUserProfile,updateUserProfile, deleteUser};