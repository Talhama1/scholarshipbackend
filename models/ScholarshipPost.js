// models/ScholarshipPost.js
const mongoose = require('mongoose');

const ScholarshipPostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  fundingType: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const ScholarshipPost = mongoose.model('ScholarshipPost', ScholarshipPostSchema);

module.exports = ScholarshipPost;
