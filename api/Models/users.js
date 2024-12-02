const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Ensure no leading or trailing spaces
  },
  fullName: {
    type: String,
    required: true,
    validate: {
      validator: (name) => /^[A-Za-z\s]+$/.test(name),
      message: 'Invalid full name format. Only alphabets and spaces are allowed.',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Optional: enforce a minimum password length
  },
  type: {
    type: String,
    required: true,
    enum: ['employee', 'admin'], // Only allow specific values
  },
});

// Create the user model
const userModel = mongoose.models.User || mongoose.model('User', userSchema);

// Helper functions
const findByUsername = async (email) => {
  return await userModel.findOne({ email });;
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (user, inputPassword) => {
  if (!user || !user.password) {
    return false;
  }
  return await bcrypt.compare(inputPassword, user.password);
};

const findAll = async () => {
  return await userModel.find({}, 'fullName email type');
};


const getUser = async (email) => {
  try {
    const user = await userModel.findOne({ email }, 'fullName email type'); // Use findOne for a single user
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Error fetching user');
  }
};
// Export the model and helpers
module.exports = {
  userModel,
  findByUsername,
  hashPassword,
  verifyPassword,
  findAll,
  getUser,
};
