const request = require('supertest');
const app = require('../app');
const pool = require('../db/db');

describe('POST /api/login', () => {

  const utenteProva = {

    username: 'erferrone@test.com',
    password: 'forzaNapoli!',
    tipoUtente: 'cliente',
    nome: 'Luca',
    cognome: 'Ferro',
    indirizzo: 'Via Varese 98',
    numeroCarta: '4539578763621486',
    dataScadenza: '2030-12-31',
    domandaSicurezza: 'Colore preferito?',
    rispostaSicurezza: 'Giallo'

  };

  //Prima di eseguire il test, registro l'utente
  beforeAll(async () => {

    await request(app)
      .post('/api/registrazione')
      .send({

        username: utenteProva.username,
        email: utenteProva.username,
        password: utenteProva.password,
        tipoUtente: utenteProva.tipoUtente,
        nome: utenteProva.nome,
        cognome: utenteProva.cognome,
        indirizzo: utenteProva.indirizzo,
        numeroCarta: utenteProva.numeroCarta,
        dataScadenza: utenteProva.dataScadenza,
        domandaSicurezza: utenteProva.domandaSicurezza,
        rispostaSicurezza: utenteProva.rispostaSicurezza

      });

  });

  it('Dovrebbe fare login con credenziali corrette', async () => {

    const res = await request(app)
      .post('/api/login')
      .send({

        username: utenteProva.username,
        password: utenteProva.password

      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.utente.email).toBe(utenteProva.username);

    //Verifico che venga settato il token nei cookie
    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toMatch(/token=/);

  });

  it('Dovrebbe fallire con password sbagliata', async () => {

    const res = await request(app)
      .post('/api/login')
      .send({

        username: utenteProva.username,
        password: 'passwordErrata'

      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(false);

  });

  it('Dovrebbe fallire con un utente che non esiste', async () => {

    const res = await request(app)
      .post('/api/login')
      .send({

        username: 'utenteinesistente@test.com',
        password: 'qualcosa'

      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(false);

  });

  //Pulizia dopo tutti i test
  afterAll(async () => {
    await pool.query('DELETE FROM \"ElencoUtenti\" WHERE \"Email\"=$1', [utenteProva.username]);
    await pool.query('DELETE FROM \"DatiCarte\" WHERE \"Email\"=$1', [utenteProva.username]);
  });

});