const Job = require('../models/Job.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const postJob = async (req, res) => {
    
    const { position, description, requirements, employmentType, seniority, salary, location, tags, companyId,companyName } = req.body;
    console.log(seniority)
    try {
        const newJob = new Job({
            companyId,
            companyName,
            position,
            description,
            requirements,
            employmentType,
            seniority,
            salary,
            location,
            tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length) : [],
            publishedAt: new Date(),
            expiresAt: new Date(Date.now() + 30*24*60*60*1000) // 30 days from now
        });
        await newJob.save();
        return res.status(201).json({ message: 'Job posted successfully', job: newJob });
      }
        catch (error) {
        console.error('Error in postJob:', error);
        return res.status(500).json({ message: 'Server error' });
        }
};

const getCompanyJobs = async (req, res) => {
    const companyId = req.params.companyId;
    try {
        const jobs = await Job.find({ companyId });
        return res.status(200).json({ jobs });
        } catch (error) {
        console.error('Error in getCompanyJobs:', error);
        return res.status(500).json({ message: 'Server error' });
        }
};

const updateJob = async (req, res) => {
    const jobId = req.params.jobId;
    const updates = req.body;
    try {
        const updatedJob = await Job.findByIdAndUpdate(jobId, updates, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        return res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        console.error('Error in updateJob:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const deleteJob = async (req, res) => {
    const jobId = req.params.jobId;
    console.log('deleteJob called with jobId:', jobId);
    try {
        const deletedJob = await Job.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        return res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error in deleteJob:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {postJob, getCompanyJobs, updateJob, deleteJob};