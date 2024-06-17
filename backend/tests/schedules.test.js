const request = require('supertest');
const app = require('../app');
const { token } = require('./setup');

describe('Waste Collection Scheduling', () => {
  test('should create a waste collection schedule', async () => {
    const res = await request(app)
      .post('/api/schedules')
      .set('Authorization', `Bearer ${token}`)
      .send({ date: '2023-12-01', time: '10:00', userId: 1 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  test('should retrieve waste collection schedules', async () => {
    const res = await request(app)
      .get('/api/schedules')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  test('should update a waste collection schedule', async () => {
    const newSchedule = await request(app)
      .post('/api/schedules')
      .set('Authorization', `Bearer ${token}`)
      .send({ date: '2023-12-01', time: '10:00', userId: 1 });

    const scheduleId = newSchedule.body.id;

    const res = await request(app)
      .put(`/api/schedules/${scheduleId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ time: '15:00' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('updated');
  });

  test('should delete a waste collection schedule', async () => {
    const newSchedule = await request(app)
      .post('/api/schedules')
      .set('Authorization', `Bearer ${token}`)
      .send({ date: '2023-12-01', time: '10:00', userId: 1 });

    const scheduleId = newSchedule.body.id;

    const res = await request(app)
      .delete(`/api/schedules/${scheduleId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('cancelled');
  });
});
