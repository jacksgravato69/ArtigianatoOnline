const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../../db/db');

router.post('/', async(req, res) => {

    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    await pool.query('INSERT INTO \"Clienti\" VALUES ($1, $2, $3)', [email, username, hashedPassword])
        .then(result => {

            console.log("Registrazione avvenuta con successo");
            res.status(200).json({ message: "Registrazione avvenuta con successo" });

        })
        .catch(err => {

            console.error("Errore durante la registrazione:", err);
            res.status(500).json({ error: "Errore durante la registrazione" });

        });

}) ;

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


module.exports = router;