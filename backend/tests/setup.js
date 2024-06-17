const request = require('supertest');
const { User } = require('../models');
const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

// Assuming your environment is set to 'test' in your testing script or environment variable
const env = process.env.NODE_ENV || 'test';
const sequelize = new Sequelize(config[env]);

let token;

beforeAll(async () => {
  try {
    await sequelize.authenticate(); // Check database connection
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: true }); // Sync database schema

    // Create test user and obtain token
    const user = await User.create({
      firstname: 'Test',
      lastname: 'User',
      address: '123 Test St',
      password: 'password', // Make sure this matches your hashing logic
      email: 'test@example.com',
      role: 'user'
    });

    const res = await request(require('../app')) // Assuming your app is correctly exported from app.js
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    token = res.body.token;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit process on database connection error
  }
});

module.exports = { token };
