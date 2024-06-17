const request = require('supertest');
const app = require('../app'); // Make sure the path is correct

describe('User Authentication', () => {
  it('should signup a new user', async () => {
    // Try to register the user, expecting 201 for success or 409 if user already exists
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        firstname: 'khey',
        lastname: 'deet',
        email: 'ade1@gmail.com',
        password: 'ade',
        address: ''
      });

    if (res.statusCode === 409) {
      console.log('User already exists, proceeding with login test.');
    } else {
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toContain('registered successfully');
    }
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ade1@gmail.com',
        password: 'ade'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ade1@gmail.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain('Invalid credentials');
  });
});
