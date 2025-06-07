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

    //Salvo in una variabile l'utente trovato
    const utente = resultUtente.rows[0];

    //Controllo se l'utente esiste, e nel caso non esista restituisco un success a false
    if (!utente) {

      return res.json({ success: false });

    }

    //Se esiste l'utente, confronto la password ricevuta con quella salvata nel DB cifrata
    if (await bcrypt.compare(password, utente["Password"])) {

        //Creo il token JWT
        const token = jwt.sign(
            {

                email: utente["Email"],
                username: utente["Username"],
                ruolo: utente["TipoUtente"]
                
            },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        //Se la password è corretta, restituisco un success a true e il tipo di utente
        return res
                .cookie('token', token, {

                  httpOnly: true, //Cookie accessibile solo lato server con richieste HTTP
                  secure: false, //Settato a false il cookie può essere inviato anche con connessioni HTTP (anche se non sono HTTPS)
                  sameSite: 'lax', //Cookie inviato solo per richieste in sito
                  maxAge: 2 * 60 * 60 * 1000 //Tempo di durata del cookie in ms, messo con questo calcolo per abbreviare la cifra

                })
                .json({ 

                  success: true,
                  utente: {

                    email: utente["Email"],
                    username: utente["Username"],
                    ruolo: utente["TipoUtente"],
                    domandaSicurezza: utente["DomandaSicurezza"]

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