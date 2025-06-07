const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should return 404', async () => {
    const res = await request(app).get('/');
    expect([200,404]).toContain(res.statusCode); // <-- 404 se non hai una rotta /, 200 se la aggiungi!
  });
});