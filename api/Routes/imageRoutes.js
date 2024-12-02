const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadImage, getGallery } = require('../Controllers/imageController');

// Configure storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images'); // Save images in 'uploads/images'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload an image (used for data insertion only)
router.post('/upload', upload.single('image'), uploadImage);

// Fetch all companies (name, description, and image path)
router.get('/gallery', getGallery);

module.exports = router;
