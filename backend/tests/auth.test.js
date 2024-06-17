const request = require('supertest');
const app = require('../app');

describe('User Authentication', () => {
  test('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        firstname: 'New',
        lastname: 'User',
        address: '456 New St',
        email: 'newuser@example.com',
        password: 'newpassword', // Ensure this matches your hashing logic
        role: 'user'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  test('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('should not login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
  });
});
