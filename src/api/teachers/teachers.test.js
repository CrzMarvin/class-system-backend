const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/address', () => {
  it('should respond with an array of address', async () => {
    const response = await supertest(app)
      .get('/api/v1/address')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should respond with an 404', async () => {
    await supertest(app)
      .get('/api/v1/address/21983yh')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
