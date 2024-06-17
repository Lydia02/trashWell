require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const scheduleRoutes = require('./routes/schedules');
const recyclingRoutes = require('./routes/recycling');
const adminAuth = require('./routes/adminAuth');
const adminRoutes = require('./routes/admin'); 
const cors = require('cors');

// Remove the duplicate declaration of 'app'
app.use(cors());
app.use(cors({
    origin: 'https://trashwell-1.onrender.com/',
}));


app.use(express.json());
app.use(express.static('frontend'));

app.use('/api/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/recycling', recyclingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/adminauth', adminAuth);

app.get('/', (req, res) => {
    res.send('Smart Waste Management System is up and running!');
});

module.exports = app;
const cors = require('cors');
const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const scheduleRoutes = require('./routes/schedules');
const recyclingRoutes = require('./routes/recycling');
const adminAuth = require('./routes/adminAuth');
const adminRoutes = require('./routes/admin');

const app = express();

const allowedOrigins = ['https://trashwell.onrender.com'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());
app.use(express.static('frontend'));

app.use('/api/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/recycling', recyclingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/adminauth', adminAuth);

app.get('/', (req, res) => {
    res.send('Smart Waste Management System is up and running!');
});

module.exports = app;
