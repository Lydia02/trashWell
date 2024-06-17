const request = require('supertest');
const { User } = require('../models');
const sequelize = require('../config/database');

let token;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  // Create test user and obtain token
  const user = await User.create({
    firstname: 'Test',
    lastname: 'User',
    address: '123 Test St',
    password: 'password', // Ensure this matches your hashing logic
    email: 'test@example.com',
    role: 'user'
  });

  const res = await request(require('../app'))
    .post('/api/auth/login')
    .send({ email: 'test@example.com', password: 'password' });

  token = res.body.token;
});

module.exports = { token };
