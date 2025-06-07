const request = require('supertest');
const app = require('../app');
const pool = require('../db/db');

describe('GET /api/verificaToken', () => {
  const email = `utente-test-${Date.now()}@test.com`;
  const password = 'ACD()83DC!';
  let token = '';

  //Faccio registrare un utente
  beforeAll(async () => {

    await request(app)
      .post('/api/registrazione')
      .send({

        username: 'LoUsername',
        email,
        password,
        tipoUtente: 'cliente',
        nome: 'High',
        cognome: 'Way',
        indirizzo: 'To Hell 89',
        numeroCarta: '4539578763621486',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Colore preferito?',
        rispostaSicurezza: 'Rosso'

      });

    //Faccio fare il login per ottenere il token
    const res = await request(app)
      .post('/api/login')
      .send({

        username: email,
        password

      });
    token = res.headers['set-cookie'].find(c => c.startsWith('token=')).split(';')[0];
  });

  it("Dovrebbe restituire i dati dell'utente autenticato", async () => {

    const res = await request(app)
      .get('/api/verificaToken')
      .set('Cookie', [token]);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

  });

  afterAll(async () => {

    await pool.query('DELETE FROM \"ElencoUtenti\" WHERE \"Email\" = $1', [email]);
    await pool.query('DELETE FROM \"DatiCarte\" WHERE \"Email\" = $1', [email]);

  });
});