const request = require('supertest');
const app = require('../app');
const pool = require('../db/db');

describe('POST /api/confermaOrdine', () => {

  //Dati di test per creare l'artigiano
  const artigianoEmail = `artigiano-test-user-${Date.now()}@test.com`;
  const artigianoPassword = 'ArtigianoPass123!';
  const artigianoUsername = 'ArtigianoTesting';
  const tipoUtenteArtigiano = 'artigiano';
  // Dati test cliente
  const clienteEmail = `cliente-test-user-${Date.now()}@test.com`;
  const clientePassword = 'ClientePass123!';
  const clienteUsername = 'ClienteTesting';
  const tipoUtenteCliente = 'cliente';

  //Inizializzo le variabili che mi serviranno nel test per i prodotti da ordinare
  let prodottoId = null;
  let clienteToken = '';
  let artigianoToken = '';

  //Registro sia un artigiano che un cliente e faccio il login con entrambi per ottenere i 2 token dai cookies
  beforeAll(async () => {

    await request(app)
      .post('/api/registrazione')
      .send({

        username: artigianoUsername,
        email: artigianoEmail,
        password: artigianoPassword,
        tipoUtente: tipoUtenteArtigiano,
        nome: 'Federico',
        cognome: 'Fontana',
        indirizzo: 'Via Genoveffa 5',
        numeroCarta: '4539578763621486',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'In che città sei nato?',
        rispostaSicurezza: 'Cardano al Campo'

      });

      //Login dell'artigiano
    const artRes = await request(app)
      .post('/api/login')
      .send({

        username: artigianoEmail,
        password: artigianoPassword

    });
    artigianoToken = artRes.headers['set-cookie'].find(c => c.startsWith('token=')).split(';')[0];

    await request(app)
      .post('/api/registrazione')
      .send({

        username: clienteUsername,
        email: clienteEmail,
        password: clientePassword,
        tipoUtente: tipoUtenteCliente,
        nome: 'Stefano',
        cognome: 'Pellino',
        indirizzo: 'Via Cliente 1',
        numeroCarta: '4539578763621486',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Animale preferito?',
        rispostaSicurezza: 'Gatto'

      });

    const cliRes = await request(app)
      .post('/api/login')
      .send({

        username: clienteEmail, 
        password: clientePassword

    });
    clienteToken = cliRes.headers['set-cookie'].find(c => c.startsWith('token=')).split(';')[0];

    //Faccio creare un prodotto all'artigiano
    const prodRes = await request(app)
      .post('/api/creaProdotto')
      .set('Cookie', [artigianoToken])
      .field('nomeProdotto', 'ProdottoTest')
      .field('descrizioneProdotto', 'Un prodotto per il test')
      .field('tipologiaProdotto', 'Artigianato')
      .field('quantita', '2')
      .field('prezzoProdotto', '15.00')
      .attach('immagine', Buffer.from([0xff, 0xd8, 0xff, 0xd9]), 'fakeimg.jpg');
    expect(prodRes.body.success).toBe(true);

    //Prendo l'ID del prodotto appena creato
    const prodotti = await pool.query('SELECT * FROM \"ElencoProdotti\" WHERE \"Email\" = $1 ORDER BY \"ID\" DESC LIMIT 1', [artigianoEmail]);
    prodottoId = prodotti.rows[0].ID;

  });

  it('Dovrebbe effettuare un ordine come cliente', async () => {

    const ordine = {
      carrello: [
        {

          ID: prodottoId,
          quantita: 1,
          prezzoTotale: 15.00,
          email: artigianoEmail

        }
      ],

      nome: 'Giovanna',
      cognome: 'Leonida',
      indirizzo: 'Via Army 7',
      provincia: 'Varese'

    };

    const res = await request(app)
      .post('/api/confermaOrdine')
      .set('Cookie', [clienteToken])
      .send(ordine);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/ordine effettuato/i);

    //Verifico che l'ordine sia stato inserito 
    const ordini = await pool.query('SELECT * FROM \"Ordini\" WHERE \"EmailCliente\" = $1 ORDER BY \"ID\" DESC LIMIT 1',[clienteEmail]);
    expect(ordini.rows.length).toBeGreaterThan(0);

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