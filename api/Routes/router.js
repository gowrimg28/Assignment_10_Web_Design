const express = require('express');
const router = express.Router();
const { loginController } = require('../Controllers/controller');

router.post('/login', loginController);

module.exports = router;