const request = require('supertest');
const app = require('../app');
const pool = require('../db/db');
const fs = require('fs');
const path = require('path');

describe('GET /api/elencoOrdini', () => {

  const artigianoEmail = `artigiano-test-${Date.now()}@test.com`;
  const clienteEmail = `cliente-test-${Date.now()}@test.com`;
  const password = 'ErSuperPassword76!';
  let artigianoToken = '';
  let prodottoId = null;

  //Faccio registrare un artigiano
  beforeAll(async () => {

    await request(app)
      .post('/api/registrazione')
      .send({

        username: 'ErCreatore',
        email: artigianoEmail,
        password,
        tipoUtente: 'artigiano',
        nome: 'Cre',
        cognome: 'ettore',
        indirizzo: 'Via Emis 5',
        numeroCarta: '4539578763621486',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Colore preferito?',
        rispostaSicurezza: 'Nero'

      });

      //Faccio il login con l'artigiano
    const artiRes = await request(app)
      .post('/api/login')
      .send({

        username: artigianoEmail, 
        password 

    });
    artigianoToken = artiRes.headers['set-cookie'].find(c => c.startsWith('token=')).split(';')[0];

    //Creo un cliente
    await request(app)
      .post('/api/registrazione')
      .send({

        username: 'ClintEast8',
        email: clienteEmail,
        password,
        tipoUtente: 'cliente',
        nome: 'Cli',
        cognome: 'Lil',
        indirizzo: 'Via Nas 90',
        numeroCarta: '4539578763621486',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Animale preferito?',
        rispostaSicurezza: 'Ghepardo'
        
      });

      //Faccio fare il login al cliente
      const cliRes = await request(app)
      .post('/api/login')
      .send({ 

        username: clienteEmail,
        password 

    });
    const clienteToken = cliRes.headers['set-cookie'].find(c => c.startsWith('token=')).split(';')[0];

    //Faccio creare all'artigiano un prodotto
    const fakeImagePath = path.join(__dirname, 'fakeimg.jpg');
    fs.writeFileSync(fakeImagePath, Buffer.from([0xff, 0xd8, 0xff, 0xd9]));
    await request(app)
      .post('/api/creaProdotto')
      .set('Cookie', [artigianoToken])
      .field('nomeProdotto', 'ProdottoOrdine')
      .field('descrizioneProdotto', 'Test ordine')
      .field('tipologiaProdotto', 'Artigianato')
      .field('quantita', '3')
      .field('prezzoProdotto', '10.00')
      .attach('immagine', fakeImagePath);

    fs.existsSync(fakeImagePath) && fs.unlinkSync(fakeImagePath);

    //Prendo l'ID dell'ordine appena creato
    const prodRes = await pool.query('SELECT * FROM \"ElencoProdotti\" WHERE \"Email\" = $1 ORDER BY \"ID\" DESC LIMIT 1',[artigianoEmail]);
    prodottoId = prodRes.rows[0].ID;

    //Faccio fare al cliente un ordine su quel prodotto appena creato dall'artigiano
    await request(app)
      .post('/api/confermaOrdine')
      .set('Cookie', [clienteToken])
      .send({
        carrello: [
          {

            ID: prodottoId,
            quantita: 1,
            prezzoTotale: 10.00,
            email: artigianoEmail

          }
        ],
        nome: 'Cli',
        cognome: 'Lil',
        indirizzo: 'Via Nas 2',
        provincia: 'Bolzano'
      });
  });

  it('Dovrebbe restituire l\'elenco ordini dell\'artigiano', async () => {

    const res = await request(app)
      .get('/api/elencoOrdini')
      .set('Cookie', [artigianoToken]);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.elencoOrdini)).toBe(true);

  });

  //Pulisco il DB
  afterAll(async () => {

    await pool.query('DELETE FROM \"OrdiniProdotti\" WHERE \"EmailArtigiano\" = $1', [artigianoEmail]);
    await pool.query('DELETE FROM \"Ordini\" WHERE \"EmailCliente\" = $1', [clienteEmail]);
    await pool.query('DELETE FROM \"ElencoProdotti\" WHERE \"Email\" = $1', [artigianoEmail]);
    await pool.query('DELETE FROM \"ElencoUtenti\" WHERE \"Email\" IN ($1, $2)', [clienteEmail, artigianoEmail]);
    await pool.query('DELETE FROM \"DatiCarte\" WHERE \"Email\" IN ($1, $2)', [clienteEmail, artigianoEmail]);

  });

});