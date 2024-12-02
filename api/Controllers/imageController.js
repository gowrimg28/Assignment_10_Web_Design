const Image = require('../Models/image');

// Fetch all company data (images, names, and descriptions) from the database
const getGallery = async (req, res) => {
  try {
    const companies = await Image.find(); // Fetch all data from MongoDB
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companies from the database' });
  }
};

// Upload an image and save company data (used for feeding data into MongoDB)
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { name, description } = req.body;
  console.log(req.file)
  const newCompany = new Image({
    name,
    description,
    path: `/uploads/images/${req.file.filename}`,
  });

  try {
    const savedCompany = await newCompany.save();
    res.status(200).json({ message: 'Company data uploaded successfully', company: savedCompany });
  } catch (error) {
    console.error('Error saving company data:', error);
    res.status(500).json({ error: 'Failed to save company data to the database' });
  }
};

module.exports = { uploadImage, getGallery };
