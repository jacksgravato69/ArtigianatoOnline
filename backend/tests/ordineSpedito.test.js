const request = require('supertest');
const app = require('../app');
const pool = require('../db/db');
const fs = require('fs');
const path = require('path');

describe('POST /api/ordineSpedito', () => {

  const artigianoEmail = `artigiano-test-${Date.now()}@test.com`;
  const clienteEmail = `cliente-test-${Date.now()}@test.com`;
  const password = 'unaBellaPassword!';
  const artigianoUsername = 'L\'artigiano';
  const clienteUsername = 'Il cliente';

  let artigianoToken = '';
  let prodottoId = null;
  let ordineProdottoId = null;

  //Mi registro sia con l'artigiano che con il cliente e faccio il login
  beforeAll(async () => {

    await request(app)
      .post('/api/registrazione')
      .send({

        username: artigianoUsername,
        email: artigianoEmail,
        password,
        tipoUtente: 'artigiano',
        nome: 'Arti',
        cognome: 'Five',
        indirizzo: 'Via Stalla 70',
        numeroCarta: '4539578763621486',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Colore preferito?',
        rispostaSicurezza: 'Blu'

      });

    const artiRes = await request(app)
      .post('/api/login')
      .send({ 
        
        username: artigianoEmail, 
        password 
    
    });
    artigianoToken = artiRes.headers['set-cookie'].find(c => c.startsWith('token=')).split(';')[0];

    await request(app)
      .post('/api/registrazione')
      .send({

        username: clienteUsername,
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

    const cliRes = await request(app)
      .post('/api/login')
      .send({
        
        username: clienteEmail, 
        password 
    
    });
    const clienteToken = cliRes.headers['set-cookie'].find(c => c.startsWith('token=')).split(';')[0];

    //Faccio creare un prodotto all'artigiano
    const fakeImagePath = path.join(__dirname, 'fakeimg.jpg');
    fs.writeFileSync(fakeImagePath, Buffer.from([0xff, 0xd8, 0xff, 0xd9]));
    await request(app)
      .post('/api/creaProdotto')
      .set('Cookie', [artigianoToken])
      .field('nomeProdotto', 'ProdottoSpedizione')
      .field('descrizioneProdotto', 'Per test spedizione')
      .field('tipologiaProdotto', 'Artigianato')
      .field('quantita', '3')
      .field('prezzoProdotto', '12.00')
      .attach('immagine', fakeImagePath);

    fs.existsSync(fakeImagePath) && fs.unlinkSync(fakeImagePath);

    //Salvo in una variabile l'ID del prodoto appena creato
    const prodRes = await pool.query('SELECT * FROM \"ElencoProdotti\" WHERE \"Email\" = $1 ORDER BY \"ID\" DESC LIMIT 1',[artigianoEmail]);
    prodottoId = prodRes.rows[0].ID;

    //Ora faccio ordinare quel prodotto al cliente
    await request(app)
      .post('/api/confermaOrdine')
      .set('Cookie', [clienteToken])
      .send({
        carrello: [
          {

            ID: prodottoId,
            quantita: 1,
            prezzoTotale: 12.00,
            email: artigianoEmail

          }
        ],
        nome: 'Cli',
        cognome: 'Lil',
        indirizzo: 'Via Nas 90',
        provincia: 'Como'
      });

    //Prendo l'ID di una riga dei prodotti che ha ordinato
    const ordiniProdotti = await pool.query('SELECT * FROM \"OrdiniProdotti\" WHERE \"EmailArtigiano\" = $1 ORDER BY \"ID\" DESC LIMIT 1',[artigianoEmail]);
    ordineProdottoId = ordiniProdotti.rows[0].ID;
  });

  it('Dovrebbe eliminare (spedire) un ordine prodotto esistente', async () => {
    const res = await request(app)
      .post('/api/ordineSpedito')
      .set('Cookie', [artigianoToken])
      .send({ ID: ordineProdottoId });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/spedito/i);

    // Controlla che la riga sia stata eliminata dal DB
    const check = await pool.query('SELECT * FROM \"OrdiniProdotti\" WHERE \"ID\" = $1', [ordineProdottoId]);
    expect(check.rows.length).toBe(0);
  });

  it('Dovrebbe restituire un codice errore di 404 se l\'ID non esiste', async () => {
    const res = await request(app)
      .post('/api/ordineSpedito')
      .set('Cookie', [artigianoToken])
      .send({
        
        ID: 99999999 //Metto un ID che non dovrebbe esistere
    
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/non trovato/i);
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