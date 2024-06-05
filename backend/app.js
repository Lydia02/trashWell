// app.js
require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const scheduleRoutes = require('./routes/schedules');
const recyclingRoutes = require('./routes/recycling');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/recycling', recyclingRoutes);

app.get('/', (req, res) => {
    res.send('Smart Waste Management System is up and running!');
});

module.exports = app;
