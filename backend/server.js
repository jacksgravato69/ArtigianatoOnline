const express = require('express');
const app = express();
const port = 3000;
const pool = require('./db/db');
const cors = require('cors');
app.use(cors());

//Importo le rotte API
const registrazioneAPI = require('./routes/api/registrazione.js');
const loginAPI = require('./routes/api/login.js')

//Dico di leggere tutti i file statici dalla cartella public; tutti i file che si trovano in questa cartella sono accessibili come se si trovssero nella root
//app.use(express.static(__dirname + "/public"));
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

//Quando viene creato il server, stampo un messaggio del link di dove si trova
app.listen(port,'0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});

//Indica che tutte le richieste che iniziano con /api/registrazione verranno gestite da quello che c’è nel file registrazione.js
app.use('/api/registrazione', registrazioneAPI);

//Indica che tutte le richieste che iniziano con /api/login verranno gestite da quello che c’è nel file login.js
app.use('/api/login', loginAPI);

//Per immagini
app.use(express.static('public'));
