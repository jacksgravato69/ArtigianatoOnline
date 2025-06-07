const request = require('supertest');
const app = require('../app');
const pool = require('../db/db');
const bcrypt = require('bcrypt');

describe('POST /api/modifica', () => {
  //Utente di test
  //Metto un timestamp così il test è sempre utilizzabile
  const email = `test-${Date.now()}@test.com`;
  const username = 'UsernameTest';
  const password = 'TestPass123!';
  const tipoUtente = 'cliente';
  const domandaSicurezza = 'Qual è il tuo animale preferito?';
  const rispostaSicurezza = 'Giraffa';
  const numeroCarta = '4539578763621486';
  let token = '';

  beforeAll(async () => {
    
    //Registro l'utente chiamando l'api di registrazione
    await request(app)
      .post('/api/registrazione')
      .send({

        username,
        email,
        password,
        tipoUtente,
        nome: 'Luca',
        cognome: 'Maculan',
        indirizzo: 'Via Generica, 5',
        numeroCarta,
        dataScadenza: '2030-12-31',
        domandaSicurezza,
        rispostaSicurezza

      });

    //Effettuo anche il login
    const res = await request(app)
      .post('/api/login')
      .send({
        
        username: email, password
    
    });

    //Prendo il token dal cookie
    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    const cookieString = cookies.find(c => c.startsWith('token='));
    token = cookieString.split(';')[0].split('=')[1];

  });

  //Funzione per fare richieste protette con il token
  function authReq() {

    return request(app).post('/api/modifica').set('Cookie', [`token=${token}`]);

  }

  it('Dovrebbe cambiare lo username', async () => {

    const nuovoUsername = 'NuovoUsernameTest';

    const res = await authReq().send({

      tipoModifica: 'username',
      nuovoUsername,
      vecchiaMail: email,
      tipoUtente

    });

    expect(res.statusCode).toBe(200);
    expect(res.body.utente.username).toBe(nuovoUsername);
    expect(res.body.token).toBeDefined();

    //Aggiorno il token dopo la modifica
    token = res.body.token;
  });

  it('Dovrebbe dire che lo username è uguale se non cambia', async () => {

    const res = await authReq().send({

      tipoModifica: 'username',
      nuovoUsername: 'NuovoUsernameTest',
      vecchiaMail: email,
      tipoUtente

    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/uguale a quello attuale/i);
    expect(res.body.utente.username).toBe('NuovoUsernameTest');

  });

  it('Dovrebbe cambiare l\'email', async () => {

    const nuovaMail = `modifica_nuova_${Date.now()}@test.com`;

    const res = await authReq().send({

      tipoModifica: 'mail',
      nuovaMail,
      vecchioUsername: 'NuovoUsernameTest',
      tipoUtenteM: tipoUtente

    });

    expect(res.statusCode).toBe(200);
    expect(res.body.utente.email).toBe(nuovaMail);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  it('Dovrebbe modificare la password se la risposta è corretta', async () => {

    const nuovaPassword = 'NuovaPass123!';

    const res = await authReq().send({

      tipoModifica: 'password',
      nuovaPassword: nuovaPassword,
      confermaNuovaPassword: nuovaPassword,
      rispostaDomanda: rispostaSicurezza

    });

    console.log('Risposta modifica password:', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

  });

  it('Dovrebbe fallire la modifica password con risposta errata', async () => {

    const res = await authReq().send({

      tipoModifica: 'password',
      nuovaPassword: 'Qualcosa123!',
      confermaNuovaPassword: 'Qualcosa123!',
      rispostaDomanda: 'RispostaSbagliata'

    });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);

  });

  it('Dovrebbe modificare il metodo di pagamento', async () => {

    const nuovoNumeroCarta = '4111111111111111';
    const res = await authReq().send({

      tipoModifica: 'pagamento',
      nome: 'Modificato',
      cognome: 'Pagatore',
      indirizzo: 'Via Nuovo Indirizzo',
      numeroCarta: nuovoNumeroCarta,
      scadenza: '2035-01-01'

    });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/metodo di pagamento/i);

  });

  it('Dovrebbe dare errore se il numero carta è invalido', async () => {

    const res = await authReq().send({

      tipoModifica: 'pagamento',
      nome: 'Modificato',
      cognome: 'Pagatore',
      indirizzo: 'Via Nuovo Indirizzo',
      numeroCarta: '1234567890123456', //numero di carta non valido per l'algoritmo di Luhn
      scadenza: '2035-01-01'

    });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/carta di credito non valido/i);

  });

  //Pulisco il DB
  afterAll(async () => {

    await pool.query('DELETE FROM "ElencoUtenti" WHERE "Email" LIKE $1', ['modifica_test_%@test.com']);
    await pool.query('DELETE FROM "ElencoUtenti" WHERE "Email" LIKE $1', ['modifica_nuova_%@test.com']);
    await pool.query('DELETE FROM "DatiCarte" WHERE "Email" LIKE $1', ['modifica_test_%@test.com']);
    await pool.query('DELETE FROM "DatiCarte" WHERE "Email" LIKE $1', ['modifica_nuova_%@test.com']);

  });
});