const express = require("express");
const router = express.Router();
const User = require("../controllers/User.controller");
const upload = require('../middleware/Upload');
const auth = require('../middleware/Authentication');

router.post('/login',auth.userloginAuthenticate);
router.post('/register',upload.fields([{ name: 'avatar', maxCount: 1 },{ name: 'resume', maxCount: 1 }]),User.createUser);
// router.get('/profile/:userId', authenticateToken, User.getUserProfile);
router.put('/update',upload.fields([{name:'avatar',maxCount:1},{name:'resume',maxCount:1}]),auth.authenticateToken,User.updateUserProfile);
router.delete('/:userId', auth.authenticateToken, User.deleteUser);
router.get('/jobs',User.getAllJobs);
router.get('/companyDetails/:companyId',User.getSpecificCompanyDetails)

module.exports = router;