const express = require('express');
const router = express.Router();
const pool = require('../../db/db');
const verificaToken = require('../../middleware/verificaToken');
const verificaRuolo = require('../../middleware/verificaRuolo');


router.get('/', verificaToken, verificaRuolo('admin'), async(req, res) => {

    try {

        const elencoUtenti = await pool.query('SELECT * FROM \"ElencoUtenti\"');
        const elencoOrdini = await pool.query('SELECT * FROM \"Ordini\"');
        const elencoSegnalazioni = await pool.query('SELECT * FROM \"Segnalazioni\"');

        const numeroUtenti = elencoUtenti.rowCount;
        const numeroOrdini = elencoOrdini.rowCount;
        const numeroSegnalazioni = elencoSegnalazioni.rowCount;

        res.status(200).json({

            success: true,
            message: 'Informazioni caricate correttamente',
            elencoUtente: elencoUtenti.rows,
            elencoOrdini: elencoOrdini.rows,
            elencoSegnalazioni: elencoSegnalazioni.rows,
            numeroUtenti: numeroUtenti,
            numeroOrdini: numeroOrdini,
            numeroSegnalazioni: numeroSegnalazioni

        })

    } catch (error) {

        console.error("Errore durante il caricamento delle informazioni", error);
        res.status(500).json({

            success: false,
            message: 'Errore durante il caricamento delle informazioni'

        })

    }

})


module.exports = router;