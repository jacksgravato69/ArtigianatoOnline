const request = require('supertest');
const app = require('../app');
const pool = require('../db/db');
const fs = require('fs');
const path = require('path');

describe('POST /api/creaProdotto', () => {

  const email = `user-test-${Date.now()}@test.com`;
  const password = 'LapAss!123';
  const username = 'ArtigianoTestProd';
  const tipoUtente = 'artigiano';

  let token = '';

  //Registro un utente di tipo artigiano
  beforeAll(async () => {

    await request(app)
      .post('/api/registrazione')
      .send({

        username,
        email,
        password,
        tipoUtente,
        nome: 'Alessandro',
        cognome: 'Pellino',
        indirizzo: 'Via Gheparto 12',
        numeroCarta: '4539578763621486',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Colore preferito?',
        rispostaSicurezza: 'Rosso'

      });

    //Effettuo il login per ottenere il token
    const res = await request(app)
      .post('/api/login')
      .send({

        username: email,
        password
    
    });

    const cookie = res.headers['set-cookie'].find(c => c.startsWith('token='));
    token = cookie.split(';')[0];

  });

  it('Dovrebbe creare un prodotto con immagine', async () => {

    //Creo una immagine
    const fakeImagePath = path.join(__dirname, 'fakeimg.jpg');
    //Specifico una foto finta
    fs.writeFileSync(fakeImagePath, Buffer.from([0xff, 0xd8, 0xff, 0xd9]));

    const res = await request(app)
      .post('/api/creaProdotto')
      .set('Cookie', [token])
      .field('nomeProdotto', 'TestProdotto')
      .field('descrizioneProdotto', 'Un prodotto di test')
      .field('tipologiaProdotto', 'Artigianato')
      .field('quantita', '5')
      .field('prezzoProdotto', '19.99')
      .attach('immagine', fakeImagePath);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/prodotto salvato/i);

    //Finta immagine
    if (fs.existsSync(fakeImagePath)) {

        fs.unlinkSync(fakeImagePath);
        
    }

  });

  afterAll(async () => {

    // Cancella i prodotti e l'utente di test
    await pool.query('DELETE FROM \"ElencoProdotti\" WHERE \"Email\" = $1', [email]);
    await pool.query('DELETE FROM \"ElencoUtenti\" WHERE \"Email\" = $1', [email]);
    await pool.query('DELETE FROM \"DatiCarte\" WHERE \"Email\" = $1', [email]);

  });

});