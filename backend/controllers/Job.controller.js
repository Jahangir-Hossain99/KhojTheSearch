const Job = require('../models/Job.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Application = require('../models/Application.js');
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

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: 'Active' });
        return res.status(200).json({ jobs });
    } catch (error) {
        console.error('Error in getAllJobs:', error);
        return res.status(500).json({ message: 'Server error' });
    }
    
};

const applyToJob = async (req, res) => {
    
    const applicationsDetails =  req.body;
    try{
        const existingApplication = await Application.findOne({
            jobId: req.params.jobId,
            applicantId: applicationsDetails.applicantId
        });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied to this job', existingApplication });
        }
        const application = new Application(applicationsDetails);
        await application.save();
        return res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error in applyToJob:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const checkApplicationStatus = async (req, res) => {
    const { jobId, userId } = req.params;
    try {
        const application = await Application.findOne({ jobId, applicantId: userId });
        if (application) {
            return res.status(200).json({ isApplied: true });
        }
        return res.status(200).json({ isApplied: false });
    }
    catch (error) {
        console.error('Error in checkApplicationStatus:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getAppliedJobsByUser = async (req, res) => {
    
    const userId = req.params.userId;
    try {
        const applications = await Application.find({ applicantId: userId }).populate('jobId');
        const userAppliedJobs = applications.map(app => app.jobId);
        console.log('User Applied Jobs:', userAppliedJobs);
        return res.status(200).json({ userAppliedJobs });
    }
    catch (error) {
        console.error('Error in getAppliedJobsByUser:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {postJob, getCompanyJobs, updateJob, deleteJob, getAllJobs, applyToJob, checkApplicationStatus, getAppliedJobsByUser};