const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Define routes
router.get('/users', userController.getUsers);

module.exports = router;
