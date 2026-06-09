const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    // 1. Link this appointment to a specific User
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model we made earlier
        required: true
    },
    serviceName: {
        type: String,
        required: [true, 'Please add a service name'],
        trim: true
    },
    appointmentDate: {
        type: Date,
        required: [true, 'Please add an appointment date and time']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Appointment', AppointmentSchema);