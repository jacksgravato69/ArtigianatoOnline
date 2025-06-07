const express = require('express');
const router = express.Router();
const verificaToken = require('../../middleware/verificaToken');
const verificaRuolo = require('../../middleware/verificaRuolo');
const pool = require('../../db/db');

router.post('/', verificaToken, verificaRuolo('artigiano'), async(req, res) => {

    try {

        const {ID, nome, descrizione, quantita, prezzo} = req.body;

        await pool.query('UPDATE \"ElencoProdotti\" SET \"NomeProdotto\" = $1, \"Descrizione\" = $2, \"Quantità\" = $3, \"Prezzo\" = $4 WHERE \"ID\" = $5', [nome, descrizione, quantita, prezzo, ID]);

        res.status(200).json({

            success: true,
            message: 'Prodotto modificato'

        })

    } catch (error) {

        console.error("Errore durante la modifca del prodotto:", error);
        res.status(500).json({

            success: false,
            message: "Errore nel modificare il prodotto"

        })

    }

})

module.exports = router;