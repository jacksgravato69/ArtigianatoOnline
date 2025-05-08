const express = require('express');
const app = express();
const port = 3000;
const pool = require('./db/db');

//Dico di leggere tutti i file statici dalla cartella public
app.use(express.static(__dirname + "/public"));

//Ricevuta una richiesta di GET, restituisco il file index.html (la richiesta GET viene fatta quando viene aperta la pagina)
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

pool.query('SELECT * FROM \"Clienti\"', (err, result) => {

    if (err) {

        console.error('Error executing query', err);

    } else {

        console.log('Query resultone:', result.rows);        
    
    }

});

//Rotta per la pagina "registraA"
app.get('/registraArtigiano', (req, res) => {

  res.sendFile(__dirname + '/views/registraA.html');

});

//Quando viene creato il server, stampo un messaggio del link di dove si trova
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});