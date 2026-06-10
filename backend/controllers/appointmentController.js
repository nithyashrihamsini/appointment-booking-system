const Appointment = require('../models/Appointment');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
    try {
        const { serviceName, appointmentDate, notes } = req.body;

        if (!serviceName || !appointmentDate) {
            return res.status(400).json({
                message: 'Please provide a service name and appointment date'
            });
        }

        const appointment = await Appointment.create({
            user: req.user.id,
            serviceName,
            appointmentDate,
            notes
        });

        res.status(201).json({
            message: 'Appointment booked successfully! 🗓️',
            appointment
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error while booking appointment',
            error: error.message
        });
    }
};

// @desc    Get logged-in user's appointments
// @route   GET /api/appointments
// @access  Private (Requires Token)
const getMyAppointments = async (req, res) => {
    console.log('getMyAppointments handler hit');
    try {
        // Find appointments where the "user" field matches the logged-in user's ID
        // .sort({ appointmentDate: 1 }) puts the closest upcoming appointments first!
        const appointments = await Appointment.find({ user: req.user.id }).sort({ appointmentDate: 1 });

        res.status(200).json({
            count: appointments.length,
            appointments
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error while fetching appointments',
            error: error.message
        });
    }
};

module.exports = {
    createAppointment,
    getMyAppointments
};