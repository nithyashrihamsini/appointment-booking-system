const Appointment = require('../models/Appointment');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
    try {
        const { serviceName, appointmentDate, notes } = req.body;

        // Validation
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
            message: 'Appointment booked successfully! ???',
            appointment
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error while booking appointment',
            error: error.message
        });
    }
};

module.exports = {
    createAppointment
};
