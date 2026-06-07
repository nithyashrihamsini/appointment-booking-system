const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    // ... keep your exact registration code here ...
};

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
      
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

       
        const user = await User.findOne({ email });
        
      
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

       
        const isMatch = await bcrypt.compare(password, user.password); // Ensure 'await' is here!
        
      
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '30d' }
        );

       
        res.status(200).json({
            message: 'Logged in successfully 👋',
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (error) {
        console.log("❌ CRASH ERROR:", error.message);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
};

// Export BOTH functions inside an object
module.exports = {
    registerUser,
    loginUser
};