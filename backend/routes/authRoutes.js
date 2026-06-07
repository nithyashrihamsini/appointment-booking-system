const express = require('express');
const router = express.Router();

// Destructure both handlers from the controller object
const { registerUser, loginUser } = require('../controllers/authController');

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;