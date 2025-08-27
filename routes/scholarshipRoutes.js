const express = require('express');
const router = express.Router();
const ScholarshipPost = require('../models/ScholarshipPost');

// POST: Create new scholarship
router.post('/123/scholarship', async (req, res) => {
  try {
    const scholarship = new ScholarshipPost(req.body);
    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (error) {
    console.error('Error creating scholarship:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: All scholarships
router.get('/123/scholarship', async (req, res) => {
  try {
    const scholarships = await ScholarshipPost.find().sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET: Single scholarship by ID
router.get('/123/scholarship/:id', async (req, res) => {
  try {
    const scholarship = await ScholarshipPost.findById(req.params.id);
    if (!scholarship) return res.status(404).json({ message: 'Not found' });
    res.json(scholarship);
  } catch (error) {
    console.error('Error fetching scholarship by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
