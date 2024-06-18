const request = require('supertest');
const app = require('../app'); // Adjust the path as needed
const { sequelize } = require('../models'); // Adjust the path as needed

describe('User Authentication', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Ensure the database is clean before tests
  });

  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstname: 'Ola',
        lastname: 'Dan',
        address: '123 Street',
        email: 'ola.dan@example.com',
        password: 'oladan'
      });

    console.log('Signup Response:', res.body); // Add this log
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ola.dan@example.com',
        password: 'oladan'
      });

    console.log('Login Response:', res.body); // Add this log
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ola.dan@example.com',
        password: 'wrongpassword'
      });

    console.log('Invalid Login Response:', res.body); // Add this log
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid credentials!');
  });

  it('should login an existing user again', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ola.dan@example.com',
        password: 'oladan'
      });

    console.log('Login Again Response:', res.body); // Add this log
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
