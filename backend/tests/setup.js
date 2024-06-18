const { Sequelize } = require('sequelize');
const request = require('supertest');
const config = require('../config/config.json');
const app = require('../app'); // Adjust path as per your project structure
const { User } = require('../models');

const env = process.env.NODE_ENV || 'test';
const sequelize = new Sequelize(config[env]);

let token;

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    await sequelize.sync({ force: true });

    // Create a test user
    const user = await User.create({
      firstname: 'Test',
      lastname: 'User',
      address: '123 Test St',
      email: 'test@example.com',
      password: 'password',
      role: 'user'
    });

    // Login to get token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    token = res.body.token;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
});

module.exports = { token };
