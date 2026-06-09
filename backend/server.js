const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected successfully 🚀');
    })
    .catch((err) => {
        console.error('Database connection error ❌:', err);
    });

// Test Route
app.get('/', (req, res) => {
    res.send('Appointment Booking API is running smoothly...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🎧`);
});