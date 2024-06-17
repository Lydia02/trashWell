const request = require('supertest');
const app = require('../app');
const { token } = require('./setup'); // Import the token from setup.js

describe('Recycling Activities', () => {
  test('should create a recycling activity', async () => {
    const res = await request(app)
      .post('/api/recycling')
      .set('Authorization', `Bearer ${token}`)
      .send({ date: '2023-12-01', material: 'Plastic', amount: 5, userId: 1 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  test('should retrieve recycling activities', async () => {
    const res = await request(app)
      .get('/api/recycling')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test('should update a recycling activity', async () => {
    const res = await request(app)
      .put(`/api/recycling/${recyclingId}`) // Replace recyclingId with actual ID
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 3.5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('updated');
  });

  test('should delete a recycling activity', async () => {
    const res = await request(app)
      .delete(`/api/recycling/${recyclingId}`) // Replace recyclingId with actual ID
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('deleted');
  });
});
