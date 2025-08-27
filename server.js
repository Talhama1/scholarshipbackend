 // server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection (use env var)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Schema
const ScholarshipPostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: String,
  fundingType: String,
  degreeType: String,
  deadline: { type: Date },
  imageUrl1: String,
  imageUrl2: String,
  imageUrl3: String,
  applyLink: String,
  scholarshipDetails: String,
});

const ScholarshipPost = mongoose.model('ScholarshipPost', ScholarshipPostSchema);

// POST - Add new scholarship
app.post('/123/scholarship', async (req, res) => {
  try {
    const newPost = new ScholarshipPost(req.body);
    const savedPost = await newPost.save();

    const formattedPost = {
      ...savedPost.toObject(),
      deadline: savedPost.deadline ? savedPost.deadline.toISOString().split('T')[0] : null,
    };

    res.json(formattedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - All scholarships
app.get('/123/scholarship', async (req, res) => {
  try {
    const posts = await ScholarshipPost.find();
    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),
      deadline: post.deadline ? post.deadline.toISOString().split('T')[0] : null,
    }));
    res.json(formattedPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - By ID
app.get('/123/scholarship/:id', async (req, res) => {
  try {
    const post = await ScholarshipPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });

    const formattedPost = {
      ...post.toObject(),
      deadline: post.deadline ? post.deadline.toISOString().split('T')[0] : null,
    };

    res.json(formattedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - By Name
app.delete('/123/scholarship/by-name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const deleted = await ScholarshipPost.findOneAndDelete({
      name: { $regex: `^${name}$`, $options: 'i' },
    });

    if (!deleted) {
      return res.status(404).json({ message: `No scholarship found with name "${name}"` });
    }

    res.json({ message: `Scholarship "${deleted.name}" deleted successfully` });
  } catch (err) {
    console.error('Error deleting scholarship:', err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
