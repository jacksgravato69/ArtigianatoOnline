/*const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

module.exports = pool;
*/

const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = {

  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,

};

const pool = new Pool(poolConfig);

//Funzione che prova a connettersi al DB per 10 volte
async function connectWithRetry(retries = 10) {

  for (let i = 0; i < retries; i++) {

    try {

        //Faccio una query di prova per verificare che il DB funzioni
        await pool.query('SELECT 1');
        console.log('Database pronto a ricevere');
        return;

    } catch (err) {

        //Nel caso dà errore, gestisco anche l'errore con il codice 57P03 che è il codice di errore di quando il DB non è ancora acceso
        //(A volte non è detto che quando si apre la porta allora il DB è pronto a ricevere)
        if(err.code === '57P03') {

            console.log('Il database si sta avviando, riprovo tra 2 secondi');

        } else {

            //Aspetta 2 secondi prima di fare una nuova richiesta
            console.log(`Tentativo ${i + 1} fallito. Aspetto 2 secondi e riprovo`);

        }

        await new Promise(res => setTimeout(res, 2000));

    }

  }

  //Se dopo 10 tentativi la query non dà risultati, allora il database non sta partendo
  throw new Error('Impossibile connettersi al database');

}

//Funzione chiamata quando il DB è pronto a ricevere
const ready = connectWithRetry();

module.exports = {
  query: async (...args) => {
    await ready;
    return pool.query(...args);
  },
  pool
};