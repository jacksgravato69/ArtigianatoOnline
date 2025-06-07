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
const elencoArtigianiAPI = require('./routes/api/elencoArtigiani.js');
const confermaOrdineAPI = require('./routes/api/confermaOrdine.js');
const elencoOrdiniAPI = require('./routes/api/elencoOrdini.js');
const ordineSpeditoAPI = require('./routes/api/ordineSpedito.js');
const modificaProdottoAPI = require('./routes/api/modificaProdotto.js');
const verificaTokenAPI = require('./routes/api/verificaTokenPagine.js');

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

//Indica che tutte le richieste che iniziano con /api/elencoArtigiani verranno gestite da quello che c’è nel file elencoArtigiani.js
app.use('/api/elencoArtigiani', elencoArtigianiAPI);

//Indica che tutte le richieste che iniziano con /api/confermaOrdine verranno gestite da quello che c’è nel file confermaOrdine.js
app.use('/api/confermaOrdine', confermaOrdineAPI);

//Indica che tutte le richieste che iniziano con /api/elencoOrdini verranno gestite da quello che c’è nel file elencoOrdini.js
app.use('/api/elencoOrdini', elencoOrdiniAPI);

//Indica che tutte le richieste che iniziano con /api/ordineSpedito verranno gestite da quello che c’è nel file ordineSpedito.js
app.use('/api/ordineSpedito', ordineSpeditoAPI);

//Indica che tutte le richieste che iniziano con /api/modificaProdotto verranno gestite da quello che c’è nel file modificaProdott.js
app.use('/api/modificaProdotto', modificaProdottoAPI);

//Indica che tutte le richieste che iniziano con /api/verificaToken verranno gestite da quello che c’è nel file verificaToken.js
app.use('/api/verificaToken', verificaTokenAPI);

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



