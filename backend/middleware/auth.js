// middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET_KEY = process.env.JWT_SECRET; // Replace with your secret key

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Received token:', token);

    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ error: 'Invalid token' });
        }
        console.log('Token verified, user:', user);
        req.user = user;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.userId);
        if (!user || user.role !== 'admin') {
            console.error('User is not admin:', user);
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error checking admin role: ' + error.message });
    }
};

module.exports = { authenticateToken, isAdmin };
