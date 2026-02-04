const express = require("express");
const router = express.Router();
const Job = require("../controllers/Job.controller");
const auth = require('../middleware/Authentication');

router.get('/:userId/applied-jobs', auth.authenticateToken, Job.getAppliedJobsByUser);


module.exports = router;