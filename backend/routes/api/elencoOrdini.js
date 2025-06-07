const express = require('express');
const router = express.Router();
const verificaToken = require('../../middleware/verificaToken');
const verificaRuolo = require('../../middleware/verificaRuolo');
const pool = require('../../db/db');

router.get('/', verificaToken, verificaRuolo('artigiano'), async(req, res) => {

    try {

        const ordini = await pool.query('SELECT * FROM \"OrdiniProdotti\" WHERE \"EmailArtigiano\" = $1', [req.utente.email]);

        res.status(200).json({

            success: true,
            elencoOrdini: ordini.rows

        })

    } catch (error) {

        console.error("Errore durante il caricamento degli ordini:", error);
        res.status(500).json({

            success: false,
            message: 'Errore durante la ricerca degli ordini'

        })

    }

});

module.exports = router;