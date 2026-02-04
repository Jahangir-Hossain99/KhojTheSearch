const express = require("express");
const router = express.Router();
const User = require("../controllers/User.controller");
const Job = require("../controllers/Job.controller");
const Company = require("../controllers/Company.controller");
const upload = require('../middleware/Upload');
const auth = require('../middleware/Authentication');

router.post('/login',auth.userloginAuthenticate);
router.post('/register',upload.fields([{ name: 'avatar', maxCount: 1 },{ name: 'resume', maxCount: 1 }]),User.createUser);
// router.get('/profile/:userId', authenticateToken, User.getUserProfile);
router.put('/update',upload.fields([{name:'avatar',maxCount:1},{name:'resume',maxCount:1}]),auth.authenticateToken,User.updateUserProfile);
router.delete('/:userId', auth.authenticateToken, User.deleteUser);

//Company and Job routes
router.get('/jobs',Job.getAllJobs);
router.get('/companyDetails/:companyId',Company.getSpecificCompanyDetails)

//Apply to job
router.post('/apply/:jobId',auth.authenticateToken,Job.applyToJob);
router.get('/checkApplication/:jobId/:userId',auth.authenticateToken,Job.checkApplicationStatus);
module.exports = router;