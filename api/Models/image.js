const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Company name
  description: { type: String, required: true }, // Company description
  path: { type: String, required: true }, // Image path
});

module.exports = mongoose.model('Image', imageSchema);
