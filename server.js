const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://scholarship:scholarship@cluster0.paswc29.mongodb.net/ScholarshipPost', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define Schema and Model
const ScholarshipPostSchema = new mongoose.Schema({
  name: String,
  region: String,
  fundingType: String,
  degreeType: String, // Add degreeType field to the schema
  imageUrl1: String,
  imageUrl2: String,
  imageUrl3: String, // Add imageUrl3 field to the schema
  applyLink: String, // Add applyLink field to the schema
  scholarshipDetails: String // Add scholarshipDetails field to the schema
});

const ScholarshipPost = mongoose.model('ScholarshipPost', ScholarshipPostSchema);

// Routes
app.post('/123/scholarship', async (req, res) => {
  try {
    const { name, region, fundingType, degreeType, imageUrl1, imageUrl2, imageUrl3, applyLink, scholarshipDetails } = req.body; // Include degreeType in the request body
    const newScholarshipPost = new ScholarshipPost({ name, region, fundingType, degreeType, imageUrl1, imageUrl2, imageUrl3, applyLink, scholarshipDetails }); // Include degreeType when creating a new scholarship post
    const savedPost = await newScholarshipPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/123/scholarship', async (req, res) => {
  try {
    const scholarshipPosts = await ScholarshipPost.find();
    res.json(scholarshipPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
