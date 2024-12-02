const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true, trim: true, }, 
  jobTitle: { type: String, required: true, trim: true,}, 
  description: { type: String, required: true, trim: true, }, 
  salary: { type: Number, required: true, min: 0, },
});

module.exports = mongoose.model('Job', jobSchema);
