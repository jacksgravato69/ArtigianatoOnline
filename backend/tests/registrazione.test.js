const request = require('supertest');
const app = require('../app');
const pool = require('../db/db');

describe('POST /api/registrazione', () => {
  it('Dovrebbe registrare un cliente con credenziali valide', async () => {

    const res = await request(app)
      .post('/api/registrazione')
      .send({

        username: 'Fabio23',
        email: 'fabio89@gmail.com',
        password: 'ErMatto32!',
        tipoUtente: 'cliente',
        nome: 'Fabio',
        cognome: 'Maculan',
        indirizzo: 'Via Test 1',
        numeroCarta: '4539578763621486',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Qual è il tuo colore preferito?',
        rispostaSicurezza: 'Blu'

      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.utente).toBeDefined();
    expect(res.body.utente.email).toBe('fabio89@gmail.com');

  });

  it('Dovrebbe registrare un artigiano con credenziali valide', async () => {

    const res = await request(app)
      .post('/api/registrazione')
      .send({

        username: 'ArtigianoVarese',
        email: 'roberto@artigiano.varese.com',
        password: 'Testing43$',
        tipoUtente: 'artigiano',
        nome: 'Roberto',
        cognome: 'Salati',
        indirizzo: 'Via Sacco 32',
        numeroCarta: '4111111111111111',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Qual è il tuo colore preferito?',
        rispostaSicurezza: 'Verde'

      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.utente).toBeDefined();
    expect(res.body.utente.email).toBe('roberto@artigiano.varese.com');

  });

  it('Dovrebbe dare errore siccome manca il numero della carta', async () => {

    const res = await request(app)
      .post('/api/registrazione')
      .send({

        username: 'Luigi43',
        email: 'luigione@gmail.com',
        password: 'Password123!',
        tipoUtente: 'cliente',
        nome: 'Luigi',
        cognome: 'Mauroni',
        indirizzo: 'Via Lombrico 2',
        //numeroCarta mancante
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Qual è il tuo animale preferito?',
        rispostaSicurezza: 'Gatto'

      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);

  });

  it('Dovrebbe dare errore siccome il numero della carta non è valido', async () => {

    const res = await request(app)
      .post('/api/registrazione')
      .send({

        username: 'Marcone76',
        email: 'marchino@gmail.com',
        password: 'Testingslo4!',
        tipoUtente: 'cliente',
        nome: 'Marco',
        cognome: 'Belotti',
        indirizzo: 'Via Sauna 15',
        numeroCarta: '1234567849203',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Qual è il tuo animale preferito?',
        rispostaSicurezza: 'Cane'

      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);

  });

});

//Pulizia dopo tutti i test
afterAll(async () => {

  await pool.query('DELETE FROM \"ElencoUtenti\" WHERE \"Email\"=$1', ['fabio89@gmail.com']);
  await pool.query('DELETE FROM \"ElencoUtenti\" WHERE \"Email\"=$1', ['roberto@artigiano.varese.com']);
  await pool.query('DELETE FROM \"DatiCarte\" WHERE \"Email\"=$1', ['fabio89@gmail.com']);
  await pool.query('DELETE FROM \"DatiCarte\" WHERE \"Email\"=$1', ['roberto@artigiano.varese.com']);

});