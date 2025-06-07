const request = require('supertest');
const app = require('../app');
const pool = require('../db/db');

describe('GET /api/elencoArtigiani', () => {
  const clienteEmail = `cliente-test-${Date.now()}@test.com`;
  const password = 'ErSuperPassword76!';
  let clienteToken = '';
  const artigianoEmail = `artigiano-test-${Date.now()}@test.com`;

  beforeAll(async () => {

    //Faccio registrare un artigiano
    await request(app)
      .post('/api/registrazione')
      .send({

        username: 'ElPerfetto',
        email: artigianoEmail,
        password,
        tipoUtente: 'artigiano',
        nome: 'Art',
        cognome: 'Six',
        indirizzo: 'Via leo 22',
        numeroCarta: '4539578763621486',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Colore preferito?',
        rispostaSicurezza: 'Viola'

      });

      //Faccio registrare un cliente
      await request(app)
      .post('/api/registrazione')
      .send({

        username: 'Sfera',
        email: clienteEmail,
        password,
        tipoUtente: 'cliente',
        nome: 'Cli',
        cognome: 'ché',
        indirizzo: 'Via Marza 40',
        numeroCarta: '4539578763621486',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Animale preferito?',
        rispostaSicurezza: 'Gatto'

      });

    //Faccio fare il login al cliente così da ottenere il token
    const cliRes = await request(app)
      .post('/api/login')
      .send({

        username: clienteEmail,
        password

      });
    clienteToken = cliRes.headers['set-cookie'].find(c => c.startsWith('token=')).split(';')[0];

  });

  it("Dovrebbe restituire l'elenco degli artigiani", async () => {

    const res = await request(app)
      .get('/api/elencoArtigiani')
      .set('Cookie', [clienteToken]);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.elencoArtigiani)).toBe(true);
    expect(res.body.elencoArtigiani.some(a => a.Username === 'ElPerfetto')).toBe(true);

  });

  //Pulisco il DB
  afterAll(async () => {

    await pool.query('DELETE FROM \"ElencoUtenti\" WHERE \"Email\" IN ($1, $2)', [clienteEmail, artigianoEmail]);
    await pool.query('DELETE FROM \"DatiCarte\" WHERE \"Email\" IN ($1, $2)', [clienteEmail, artigianoEmail]);

  });
});