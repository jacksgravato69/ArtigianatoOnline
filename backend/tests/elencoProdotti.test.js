const request = require('supertest');
const app = require('../app');
const pool = require('../db/db');

describe('POST /api/elencoProdotti', () => {
  const email = `artigiano-test-${Date.now()}@test.com`;
  const password = 'LaProva89!';
  const username = 'Lazza';
  const tipoUtente = 'artigiano';

  let token = '';
  let prodottoId1 = null;
  let prodottoId2 = null;

  //Faccio registrare l'artigiano
  beforeAll(async () => {

    await request(app)
      .post('/api/registrazione')
      .send({

        username,
        email,
        password,
        tipoUtente,
        nome: 'Gianni',
        cognome: 'Pizza',
        indirizzo: 'Via Cairoli 5',
        numeroCarta: '4539578763621486',
        dataScadenza: '2030-12-31',
        domandaSicurezza: 'Colore preferito?',
        rispostaSicurezza: 'Azzurro'

      });

      //Faccio fare il login all'artigiano
      const res = await request(app)
      .post('/api/login')
      .send({ 
        
        username: email, 
        password 
    
    });
    token = res.headers['set-cookie'].find(c => c.startsWith('token=')).split(';')[0];

    //Inserisco 2 prodotti per testare la funzione per fare restituire l'elenco di prodotti
    const prod1 = await pool.query('INSERT INTO \"ElencoProdotti\" (\"Email\", \"NomeProdotto\", \"Immagine\", \"Descrizione\", \"Tipologia\", \"Quantità\", \"Prezzo\") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING \"ID\"',[email, 'Monopoly', 'img1.jpg', 'desc1', 'Legno lavorato', 10, 21.5]);
    prodottoId1 = prod1.rows[0].ID;

    const prod2 = await pool.query('INSERT INTO \"ElencoProdotti\" (\"Email\", \"NomeProdotto\", \"Immagine\", \"Descrizione\", \"Tipologia\", \"Quantità\", \"Prezzo\") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "ID"',[email, 'Del bel whisky', 'img2.jpg', 'desc2', 'Gioielli artigianali', 5, 50]);
    prodottoId2 = prod2.rows[0].ID;

  });

  it('Dovrebbe restituire tutti i prodotti (tipoRicerca: completa)', async () => {

    const res = await request(app)
      .post('/api/elencoProdotti')
      .set('Cookie', [token])
      .send({ 

        tipoRicerca: 'completa'

     });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.prodotti)).toBe(true);

  });

  it('Dovrebbe restituire prodotti per nome (tipoRicerca: senzaFiltri)', async () => {

    const res = await request(app)
      .post('/api/elencoProdotti')
      .set('Cookie', [token])
      .send({ tipoRicerca: 'senzaFiltri', ricerca: 'monopoly' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.prodotti.length).toBeGreaterThan(0);
    
  });

  it('Dovrebbe restituire prodotti filtrati (tipoRicerca: conFiltri)', async () => {
    const res = await request(app)
      .post('/api/elencoProdotti')
      .set('Cookie', [token])
      .send({

        tipoRicerca: 'conFiltri',
        campoRicerca: 'monopoly',
        prezzoMax: 70,
        produttore: username,
        tipologia: 'Legno lavorato'

      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.prodotti.length).toBe(1);
    
  });

  it('Dovrebbe restituire tutti i prodotti dell\'artigiano (tipoRicerca: prodottiArtigiano)', async () => {

    const res = await request(app)
      .post('/api/elencoProdotti')
      .set('Cookie', [token])
      .send({ tipoRicerca: 'prodottiArtigiano' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.prodotti)).toBe(true);
    expect(res.body.prodotti.some(p => p.NomeProdotto === 'Monopoly')).toBe(true);
    expect(res.body.prodotti.some(p => p.NomeProdotto === 'Del bel whisky')).toBe(true);

  });

  afterAll(async () => {
    // Pulizia test
    await pool.query('DELETE FROM \"ElencoProdotti\" WHERE \"Email\" = $1', [email]);
    await pool.query('DELETE FROM \"ElencoUtenti\" WHERE \"Email\" = $1', [email]);
    await pool.query('DELETE FROM \"DatiCarte\" WHERE \"Email\" = $1', [email]);
  });
});