const express = require('express');
const router = express.Router();
const Company = require('../controllers/Company.controller');
const JobController = require('../controllers/Job.controller');
const User = require('../controllers/User.controller');
const upload = require('../middleware/Upload');
const auth = require('../middleware/Authentication');
const ApplicationController = require('../controllers/Application.controller');

router.get('/:companyId/applications', auth.authenticateToken, Company.getApplicantForAJob);
router.patch('/:applicantId/update-status', auth.authenticateToken, ApplicationController.applicationStatusUpdate);

module.exports = router;