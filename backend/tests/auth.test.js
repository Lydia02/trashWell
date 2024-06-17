const request = require('supertest');
const app = require('../app'); // Make sure the path is correct

describe('User Authentication', () => {
  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'secret123',
        address: '123 Main St'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toContain('registered successfully');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'secret123'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain('Invalid credentials');
  });
});