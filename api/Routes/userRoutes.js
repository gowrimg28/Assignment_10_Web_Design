const express = require('express');
const { createUser, updateUser, deleteUser, getAllUsers } = require('../Controllers/userControllers');
const router = express.Router();

router.post('/create', createUser);       // POST: Create a new user
router.put('/edit', updateUser);          // PUT: Update user details
router.delete('/delete', deleteUser);     // DELETE: Delete a user by email
router.get('/getAll', getAllUsers);       // GET: Retrieve all users

module.exports = router;
