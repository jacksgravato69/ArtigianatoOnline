const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../../db/db');


router.post('/', async(req, res) => {

    //Salvo in delle variabili i dati ricevuti dal client
    const {username, password} = req.body;

    try {

    //Inoltro una richiesta al database per cercare l'utente con l'email ricevuta
    const result = await pool.query('SELECT * FROM \"ElencoUtenti\" WHERE \"Email\" = $1', [username]);

    //Salvo in una variabile l'utente trovato
    const utente = result.rows[0];

    //Controllo se l'utente esiste, e nel caso non esista restituisco un success a false
    if (!utente) {

      return res.json({ success: false });

    }

    //Se esiste l'utente, confronto la password ricevuta con quella salvata nel DB cifrata
    if (await bcrypt.compare(password, utente["Password"])) {

        //Se la password è corretta, restituisco un success a true e il tipo di utente
      return res.json({ success: true, tipoUtente: utente["TipoUtente"] });

    } else {

        //Se la password è sbagliata, restituico un success false
      return res.json({ success: false });

    }

  } catch (err) {

    console.error(err);
    res.status(500).send('Errore server');

  }

});


module.exports = router;