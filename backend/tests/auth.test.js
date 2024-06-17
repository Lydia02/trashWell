const request = require('supertest');
const app = require('../app'); // Make sure the path is correct

describe('User Authentication', () => {
  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstname: 'ola',
        lastname: 'dan',
        email: 'ola.dan@example.com',
        password: 'oladan',
        address: 'ikeja'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toContain('registered successfully');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ola.dan@example.com',
        password: 'oladan'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ola.dan@example.com',
        password: 'wrongpassword1'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain('Invalid credentials');
  });
  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ola.dan@example.com',
        password: 'oladan'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
  
});