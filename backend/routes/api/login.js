const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async(req, res) => {

    //Salvo in delle variabili i dati ricevuti dal client
    const {username, password} = req.body;

    try {

    //Inoltro una richiesta al database per cercare l'utente con l'email ricevuta
    const resultUtente = await pool.query('SELECT * FROM \"ElencoUtenti\" WHERE \"Email\" = $1', [username]);
    const resultCarta = await pool.query('SELECT * FROM \"ElencoUtenti\" WHERE \"Email\" = $1', [username])

    //Salvo in una variabile l'utente trovato
    const utente = result.rows[0];

    //Controllo se l'utente esiste, e nel caso non esista restituisco un success a false
    if (!utente) {

      return res.json({ success: false });

    }

    //Se esiste l'utente, confronto la password ricevuta con quella salvata nel DB cifrata
    if (await bcrypt.compare(password, utente["Password"])) {

        //Creo il token JWT
        const token = jwt.sign(
            {
                id: utente["Email"],
                username: utente["Username"],
                ruolo: utente["TipoUtente"]
            },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        //Se la password è corretta, restituisco un success a true e il tipo di utente
        return res.json({ 

          success: true,
          token: token,
          utente: {

            email: utente["Email"],
            username: utente["Username"],
            ruolo: utente["TipoUtente"]

          }

        });

    } else {

        //Se la password è sbagliata, restituico un success false
      return res.json({ success: false });

    }

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: 'Errore server' });

  }

});


module.exports = router;