console.log("✅ appointmentRoutes.js loaded");
const express = require('express');
const router = express.Router();

// 1. Import both controller functions
const { createAppointment, getMyAppointments } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

console.log("createAppointment:", typeof createAppointment);
console.log("getMyAppointments:", typeof getMyAppointments);
console.log("protect:", typeof protect);
// Create Appointment (POST)
router.post('/', protect, createAppointment);
// Get My Appointments (GET)
router.get('/', protect, getMyAppointments);

module.exports = router;