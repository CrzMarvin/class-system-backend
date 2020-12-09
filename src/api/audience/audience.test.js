const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/audience', () => {
  it('should respond with an array of audience', async () => {
    const response = await supertest(app)
      .get('/api/v1/audience')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should respond with an individual state', async () => {
    const response = await supertest(app)
      .get('/api/v1/audience/1')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.id).toBe(1);
  });

  it('should respond with an 404', async () => {
    await supertest(app)
      .get('/api/v1/audience/13213')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
