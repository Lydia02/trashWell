const request = require('supertest');
const { User } = require('../models');
const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'test';
const sequelize = new Sequelize(config[env]);

let token;

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: true });

    const user = await User.create({
      firstname: 'Test',
      lastname: 'User',
      address: '123 Test St',
      password: 'password',
      email: 'test@example.com',
      role: 'user'
    });

    const res = await request(require('../app'))
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    token = res.body.token; // Save the token

  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
});

module.exports = { token };
