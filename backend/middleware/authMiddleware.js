const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // 1. Check if the token is sent in the Request Headers (Authorization: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from the header string
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using our secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

            // Find the user from the token payload and attach them to the request object (minus the password)
            req.user = await User.findById(decoded.id).select('-password');

            // Move on to the actual route handler!
            return next();

        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // 2. If no token was found at all
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };