
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const { protect } = require('./middleware/authMiddleware');
const { createAppointment, getMyAppointments } = require('./controllers/appointmentController');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use((req, res, next) => {
    fs.appendFileSync('request-log.txt', `${new Date().toISOString()} ${req.method} ${req.url}\n`);
    next();
});
// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Database connection error: ', err);
    });

// Test Route
app.get('/', (req, res) => {
    console.log('ROOT ROUTE HIT');
    console.log(app._router.stack.map((layer) => layer.route && layer.route.path));
    res.send('Appointment Booking API is running smoothly...');
});
// Appointments Routes
app.get('/foo', (req, res) => res.send('foo route works'));
app.get('/api/appointmentstest', (req, res) => res.send('test route works'));
app.route('/api/appointments')
    .get(protect, getMyAppointments)
    .post(protect, createAppointment);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} 🎧`);

        console.log('\n--- ACTIVE EXPRESS ROUTES ---');
        if (app._router && app._router.stack) {
            app._router.stack.forEach((r) => {
                if (r.route && r.route.path) {
                    console.log(`${Object.keys(r.route.methods).join(', ').toUpperCase()} -> ${r.route.path}`);
                } else if (r.name === 'router' && r.handle && r.handle.stack) {
                    r.handle.stack.forEach((layer) => {
                        if (layer.route) {
                            console.log(`${Object.keys(layer.route.methods).join(', ').toUpperCase()} -> ${layer.route.path}`);
                        }
                    });
                }
            });
        }
        console.log('-----------------------------\n');
    });
}

module.exports = app;


