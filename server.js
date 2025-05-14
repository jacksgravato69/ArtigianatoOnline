const express = require('express');
const app = express();
const port = 3000;
const pool = require('./db/db');

//Importo le rotte API per la registrazione
const registrazioneAPI = require('./routes/api/registrazione.js');

//Dico di leggere tutti i file statici dalla cartella public; tutti i file che si trovano in questa cartella sono accessibili come se si trovssero nella root
app.use(express.static(__dirname + "/public"));
 //Per richieste JSON
app.use(express.json());


//Ricevuta una richiesta di GET, restituisco il file index.html (la richiesta GET viene fatta quando viene aperta la pagina)
//Quindi quando mi collego al server da web (ossia ad http://localhost:3000) mi restituisce il file index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


//QUERY DI PROVA
pool.query('SELECT * FROM \"ElencoUtenti\"', (err, result) => {

    if (err) {

        console.error('Error executing query', err);

    } else {

        console.log('Query resultone:', result.rows);        
    
    }

});

//Quando viene creato il server, stampo un messaggio del link di dove si trova
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//Indica che tutte le richieste che iniziano con /api/registrazione verranno gestite da quello che c’è nel file registrazione.js
app.use('/api/registrazione', registrazioneAPI);


//Rotta per la pagina "registraA"
app.get('/registraArtigiano', (req, res) => {

  res.sendFile(__dirname + '/views/registraA.html');

});

//Rotta per la pagina "registraC"
app.get('/registraCliente', (req, res) => {

  res.sendFile(__dirname + '/views/registraC.html');

});

//Rotta per la pagina "homeC"
app.get('/homeCliente', (req, res) => {

  res.sendFile(__dirname + '/views/homeC.html');

});

//Rotta per la pagina "login"
app.get('/login', (req, res) => {

  res.sendFile(__dirname + '/views/login.html');

});

//Rotta per la pagina "index"
app.get('/index', (req, res) => {

  res.sendFile(__dirname + '/views/index.html');

});

//Per immagini
app.use(express.static('public'));
