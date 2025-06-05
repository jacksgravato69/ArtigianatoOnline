const express = require('express');
const router = express.Router();
const pool = require('../../db/db');
const jwt = require('jsonwebtoken');
const { hashPassword, validaCartaConLuhn } = require('../../utils/funzioni');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async(req, res) => {

    const { username, email, password, tipoUtente, nome, cognome, indirizzo, numeroCarta, dataScadenza, domandaSicurezza, rispostaSicurezza} = req.body;

    if (!numeroCarta) {

        return res.status(400).json({ 

            success: false,
            message: "Numero carta mancante" 

        });

    }

    //Controllo se il numero della carta di credito è valido
    if (!validaCartaConLuhn(numeroCarta)) {

        return res.status(400).json({ 

            success: false,
            message: "Numero della carta di credito non valido" 
        
        });
        
    }

    //Inserisco tutto in un try-catch essendo che devo effettuare 2 query, in modo da gestire eventuali errori
    try {

        //Hasho, la passoword, il numero della carta e la risposta di sicurezza
        const hashedPassword = await hashPassword(password);
        const hashedNumeroCarta = await hashPassword(numeroCarta);
        const hashedRispostaSicurezza = await hashPassword(rispostaSicurezza);

        //Query per inserimento dei dati dell'utente
        await pool.query('INSERT INTO \"ElencoUtenti\" VALUES ($1, $2, $3, $4, $5, $6)',[email, username, hashedPassword, tipoUtente, domandaSicurezza, hashedRispostaSicurezza]);

        //Query per inserimento dei dati di fatturazione dell'utente
        await pool.query('INSERT INTO \"DatiCarte\" VALUES ($1, $2, $3, $4, $5, $6)',[email, nome, cognome, indirizzo, hashedNumeroCarta, dataScadenza]);

        //Creo il token JWT
        const token = jwt.sign(

            {
                email: email,
                username: username,
                ruolo: tipoUtente

            },
            JWT_SECRET,
            { expiresIn: '2h' }

        );

        res.status(200)
            .cookie('token', token, {

                  httpOnly: true,
                  secure: false,
                  sameSite: 'Lax',
                  maxAge: 2 * 60 * 60 * 1000

                })
            .json({ 

                message: "Registrazione avvenuta con successo",
                success: true,
                token: token,
                utente: {

                    email: email,
                    username: username,
                    ruolo: tipoUtente,
                    domandaSicurezza: domandaSicurezza

                } 
            
            });

    } catch (err) {

        console.error("Errore durante la registrazione:", err);
        res.status(500).json({ 

            message: "Errore durante la registrazione",
            success: false
        
        });

    }

});

module.exports = router;