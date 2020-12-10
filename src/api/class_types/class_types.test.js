const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/class_types', () => {
  it('should respond with an array of class_types', async () => {
    const response = await supertest(app)
      .get('/api/v1/class_types/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should respond with an 404', async () => {
    await supertest(app)
      .get('/api/v1/class_types/219s83')
      .expect('Content-Type', /json/)
      .expect(404);
  });
  it('should respond with an 404', async () => {
    await supertest(app)
      .get('/api/v1/class_types/21983')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
