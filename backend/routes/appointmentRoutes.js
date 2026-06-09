const express = require('express');
const router = express.Router();

// 1. Import both controller functions
const { createAppointment, getMyAppointments } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// Create Appointment (POST)
router.post('/', protect, createAppointment);
// Get My Appointments (GET)
router.get('/', protect, getMyAppointments);

module.exports = router;