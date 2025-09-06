const express = require('express');
const Job = require('../models/Job');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// public search
router.get('/', async (req,res,next) => {
  try {
    const { q, location, jobType, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (location) filter.location = location;
    if (jobType) filter.jobType = jobType;

    let query = Job.find(filter).sort({ postedAt: -1 });

    if (q) {
      query = Job.find({ $text: { $search: q }, ...filter });
    }

    const jobs = await query.skip((page-1)*limit).limit(Number(limit)).exec();
    res.json({ jobs });
  } catch (err) { next(err); }
});

// create job (company)
router.post('/', requireAuth, async (req,res,next) => {
  try {
    if (req.user.role !== 'company') return res.status(403).json({ message: 'Only companies can post jobs' });
    const job = await Job.create({ ...req.body, company: req.user.id });
    res.status(201).json({ job });
  } catch (err) { next(err); }
});

module.exports = router;
