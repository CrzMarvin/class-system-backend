const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/courses', () => {
  it('should respond with an array of courses', async () => {
    const response = await supertest(app)
      .get('/api/v1/courses/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should respond with an 404', async () => {
    await supertest(app)
      .get('/api/v1/courses/219s83')
      .expect('Content-Type', /json/)
      .expect(404);
  });
  it('should respond with an 404', async () => {
    await supertest(app)
      .get('/api/v1/courses/21983')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
