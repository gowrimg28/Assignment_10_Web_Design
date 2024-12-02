const User = require('../Models/users');
const bcrypt = require('bcrypt');

// Create a new user
const createUser = async (req, res) => {
  const { fullName, email, password, type } = req.body;

  if (!type || !['employee', 'admin'].includes(type)) {
    return res.status(400).json({
      error: 'Invalid type. Type must be either "employee" or "admin".',
    });
  }

  try {
    const existinfindByUsernamegUser = await User.findByUsername(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    const newUser = new User({ fullName, email, password, type });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update user details
const updateUser = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (fullName) user.fullName = fullName;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Select fields to return
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, updateUser, deleteUser, getAllUsers };
