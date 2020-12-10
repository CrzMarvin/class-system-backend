const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/teachers', () => {
  it('should respond with an array of teachers', async () => {
    const response = await supertest(app)
      .get('/api/v1/teachers/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should respond with an 404', async () => {
    await supertest(app)
      .get('/api/v1/teachers/219s83')
      .expect('Content-Type', /json/)
      .expect(400);
  });
  it('should respond with an 404', async () => {
    await supertest(app)
      .get('/api/v1/teachers/21983')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
