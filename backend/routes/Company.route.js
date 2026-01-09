const express = require('express');
const router = express.Router();
const Company = require('../controllers/Company.controller');
const JobController = require('../controllers/Job.controller');
const upload = require('../middleware/Upload');
const auth = require('../middleware/Authentication');

router.post('/register',upload.fields([{ name: 'logo', maxCount: 1 }]),Company.createCompany);
router.post('/login',auth.companyLoginAuthenticate);
router.put('/update',upload.fields([{ name: 'logo', maxCount: 1 }]),auth.authenticateToken,Company.updateCompanyProfile);
router.delete('/:companyId', auth.authenticateToken, Company.deleteCompany);

// Job routes
router.post('/post-a-job', auth.authenticateToken, JobController.postJob);
router.get('/:companyId/jobs', auth.authenticateToken, JobController.getCompanyJobs);
router.put('/jobs/:jobId', auth.authenticateToken, JobController.updateJob);
router.delete('/jobs/:jobId', auth.authenticateToken, JobController.deleteJob);

module.exports = router;