const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const pool = require('./db/db');
const cors = require('cors');

//Importo le rotte API
const registrazioneAPI = require('./routes/api/registrazione.js');
const loginAPI = require('./routes/api/login.js');
const modificaAPI = require('./routes/api/modifica.js');
const creaProdottoAPI = require('./routes/api/creaProdotto.js');
const elencoProdottiAPI = require('./routes/api/elencoProdotti.js');

//Dico di leggere tutti i file statici dalla cartella public; tutti i file che si trovano in questa cartella sono accessibili come se si trovssero nella root
//app.use(express.static(__dirname + "/public"));

//Per lettura dei cookie
app.use(cookieParser());

//Permettere l'uso di cookies
app.use(cors({
  
  origin: 'http://localhost:8080',
  credentials: true    
  
}));

//Per richieste JSON
app.use(express.json());


//QUERY DI PROVA
pool.query('SELECT * FROM \"DatiCarte\"', (err, result) => {

    if (err) {

        console.error('Error executing query', err);

    } else {

        console.log('Query resultone:', result.rows);        
    
    }

});


//Indica che tutte le richieste che iniziano con /api/registrazione verranno gestite da quello che c’è nel file registrazione.js
app.use('/api/registrazione', registrazioneAPI);

//Indica che tutte le richieste che iniziano con /api/login verranno gestite da quello che c’è nel file login.js
app.use('/api/login', loginAPI);

//Indica che tutte le richieste che iniziano con /api/modifica verranno gestite da quello che c’è nel file modifica.js
app.use('/api/modifica', modificaAPI);

//Indica che tutte le richieste che iniziano con /api/modifica verranno gestite da quello che c’è nel file modifica.js
app.use('/api/creaProdotto', creaProdottoAPI);

//Indica che tutte le richieste che iniziano con /api/elencoProdotti verranno gestite da quello che c’è nel file elencoProdotti.js
app.use('/api/elencoProdotti', elencoProdottiAPI);

//Per immagini
app.use(express.static('public', {
  etag: false,
  lastModified: false,
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  }
}));

//Così facendo rendo accessibile la cartella immaginiProdotti anche al frontend
app.use('/immaginiProdotti', express.static('immaginiProdotti'));

//Quando viene creato il server, stampo un messaggio del link di dove si trova
app.listen(port,'0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});



