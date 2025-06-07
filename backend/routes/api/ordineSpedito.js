const express = require('express');
const router = express.Router();
const verificaToken = require('../../middleware/verificaToken');
const verificaRuolo = require('../../middleware/verificaRuolo');
const pool = require('../../db/db');

router.post('/', verificaToken, verificaRuolo('artigiano'), async(req, res) => {

    try {

        const { ID } = req.body;

        const queryIDOrdine = await pool.query('DELETE FROM \"OrdiniProdotti\" WHERE \"ID\" = $1 RETURNING \"IDOrdine\"', [ID]);
        const ordiniTotali = await pool.query('SELECT * FROM \"OrdiniProdotti\" WHERE \"EmailArtigiano\" = $1', [req.utente.email])

        //Verifico che almeno una riga sia stata eliminata
        if (queryIDOrdine.rows.length === 0) {

            return res.status(404).json({

                success: false,
                message: "Ordine non trovato"

            });

        }

        const idOrdine = queryIDOrdine.rows[0]["IDOrdine"];

        const ordiniRimanenti = await pool.query('SELECT * FROM \"OrdiniProdotti\" WHERE \"IDOrdine\" = $1', [idOrdine]);

        if(ordiniRimanenti.rows.length === 0) {

            await pool.query('DELETE FROM \"Ordini\" WHERE \"ID\" = $1', [idOrdine]);

        }

        res.status(200).json({

            success: true,
            elencoOrdini: ordiniTotali.rows,
            message: 'Ordine spedito con successo'

        })

    } catch (error) {

        console.error("Errore durante la conferma dell'ordine:", error);
        res.status(500).json({

            success: false,
            message: "Errore durante la conferma di spedizione dell'ordine"

        })

    }

});

module.exports = router;