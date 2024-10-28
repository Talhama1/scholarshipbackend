// routes/scholarshipRoutes.js
const express = require('express');
const router = express.Router();
const ScholarshipPost = require('../models/ScholarshipPost');

// Create a scholarship post
router.post('/', async (req, res) => {
  try {
    const newScholarshipPost = new ScholarshipPost(req.body);
    const savedPost = await newScholarshipPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all scholarship posts
router.get('/', async (req, res) => {
  try {
    const scholarshipPosts = await ScholarshipPost.find();
    res.json(scholarshipPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
