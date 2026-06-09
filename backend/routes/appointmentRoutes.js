const express = require('express');
const router = express.Router();
const { createAppointment }     = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// The protect middleware runs FIRST. If it passes, createAppointment runs next.
console.log("protect:", protect, typeof protect);
console.log("createAppointment:", createAppointment, typeof createAppointment);
router.post('/', protect, createAppointment);

module.exports = router;