const verificaToken = require('../../middleware/verificaToken');
const express = require('express');
const router = express.Router();
const pool = require('../../db/db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', verificaToken, async(req, res) => {

  //req.utente contiene: email, username, ruolo...

    const {nuovoUsername, vecchiaMail, tipoUtente, tipoModifica} = req.body;

     try {


        if(tipoModifica == "username") {

            await pool.query('UPDATE \"ElencoUtenti\" SET \"Username\" = $1 WHERE \"Email\" = $2', [nuovoUsername, req.utente.email]);
    
            //Ricreo il token JWT con il nuovo username
            const token = jwt.sign(
            
                {
                    email: vecchiaMail,
                    username: nuovoUsername,
                    ruolo: tipoUtente
            
                },
                JWT_SECRET,
                { expiresIn: '2h' }
            
            );

            res.status(200).json({ 
    
                message: "Registrazione avvenuta con successo " + nuovoUsername + req.utente.email,
                token: token,
                utente: {

                    email: vecchiaMail,
                    username: nuovoUsername,
                    ruolo: tipoUtente

                } 
    
            });

        }


    } catch (err) {

        console.error("Errore durante la modifca:", err);
        res.status(500).json({ error: "Errore durante la modifica" });

    }
  
});

module.exports = router;