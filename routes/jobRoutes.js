const express = require('express');
const router = express.Router();
const { getJobs, createJob } = require('../controllers/jobController');

router.get('/', getJobs);
router.post('/', createJob);
router.post('/jobs',jobCotroller.createJob);
module.exports = router;