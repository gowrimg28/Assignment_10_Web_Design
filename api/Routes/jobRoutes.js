const express = require('express');
const Job = require('../Models/jobs');
const router = express.Router();

// Create Job API
router.post('/create/job', async (req, res) => {
  const { companyName, jobTitle, description, salary } = req.body;

  // Validate required fields
  if (!companyName || !jobTitle || !description || !salary) {
    return res.status(400).json({ error: 'All fields are required: companyName, jobTitle, description, salary' });
  }

  try {
    // Create a new job document
    const job = new Job({
      companyName,
      jobTitle,
      description,
      salary,
    });

    // Save the job to the database
    await job.save();

    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'An error occurred while creating the job' });
  }
});


router.get('/get/jobs', async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find(); // You can use `.select()` to limit fields if needed
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs. Please try again.' });
  }
});
module.exports = router;
