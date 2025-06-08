const express = require('express');
const router = express.Router();
const pool = require('../../db/db');
const verificaToken = require('../../middleware/verificaToken');

router.post('/', verificaToken, async(req, res) => {

    const { segnalazione } = req.body;

    try {

        await pool.query('INSERT INTO \"Segnalazioni\" (\"EmailSegnalatore\", \"TestoSegnalazione\", \"TipoUtente\") VALUES ($1, $2, $3)', [req.utente.email, segnalazione, req.utente.ruolo]);

        res.status(201).json({

            success: true,
            message: 'Segnalazione inviata con successo!'

        })

    } catch (error) {

        console.error("Errore durante il caricamento della segnalazione", error);
        res.status(500).json({

            success: false,
            message: 'Errore durante la segnalazione'

        })

    }


})


module.exports = router;