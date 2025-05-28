const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../../db/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', async(req, res) => {

    const { username, email, password, tipoUtente, nome, cognome, indirizzo, numeroCarta, dataScadenza, domandaSicurezza, rispostaSicurezza} = req.body;

    //Controllo se il numero della carta di credito è valido
    if (!validaCartaConLuhn(numeroCarta)) {
        return res.status(400).json({ error: "Numero della carta di credito non valido" });
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
                id: email,
                username: username,
                ruolo: tipoUtente

            },
            JWT_SECRET,
            { expiresIn: '2h' }

        );

        res.status(200).json({ 

            message: "Registrazione avvenuta con successo",
            token: token,
            utente: {

                email: email,
                username: username,
                ruolo: tipoUtente

            } 
        
        });

    } catch (err) {

        console.error("Errore durante la registrazione:", err);
        res.status(500).json({ error: "Errore durante la registrazione" });

    }

});

async function hashPassword(password) {

    //Definisco il numero di salt rounds (ossia il numero di volte in cui viene applicato l'algoritmo di hashing)
    const saltRounds = 10;

    try {
        
        //Genero il salt (ossia una stringa casuale che viene unita alla password prima dell'hashing per renderla più sicura)
        const salt = await bcrypt.genSalt(saltRounds);
        //Hasho la password con il salt generato
        const hash = await bcrypt.hash(password, salt);

        return hash;

    } catch (error) {
        
        console.error("ERRORE NELLA HASHING DELLA PASSWORD:", error);

    }


}

//Funzione per validare il numero della carta di credito con l'algoritmo di Luhn
function validaCartaConLuhn(numeroCarta) {

    //Rimuove spazi o trattini
    const numeroPulito = numeroCarta.replace(/\D/g, '');

    let somma = 0;
    let doppio = false;

    //Scorri da destra verso sinistra
    for (let i = numeroPulito.length - 1; i >= 0; i--) {

        let cifra = parseInt(numeroPulito[i], 10);

        if (doppio) {

            cifra *= 2;
            if (cifra > 9) cifra -= 9;

        }

        somma += cifra;
        doppio = !doppio;

    }

    //È valida se la somma è multiplo di 10
    return somma % 10 === 0;

}


module.exports = router;