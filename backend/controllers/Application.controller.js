const express = require('express');
const router = express.Router();
const ApplicationModel = require('../models/Application.js');

const applicationStatusUpdate = async (req, res) => {
    const applicationId = req.params.applicantId;
    const { status } = req.body;
    try {
        const application = await ApplicationModel.findByIdAndUpdate(applicationId, { status }, { new: true });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        return res.status(200).json({ success: true , message: 'Application status updated successfully', application });
    } catch (error) {
        console.error('Error in applicationStatusUpdate:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {applicationStatusUpdate};

