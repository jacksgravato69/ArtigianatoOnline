const express = require('express');
const router = express.Router();
const verificaToken = require('../../middleware/verificaToken');
const verificaRuolo = require('../../middleware/verificaRuolo');
const pool = require('../../db/db');

router.post('/', verificaToken, verificaRuolo('cliente'), async (req, res) => {

    try {

        const {carrello, nome, cognome, indirizzo, provincia} = req.body;
    
        const risultatoQueryID = await pool.query('INSERT INTO \"Ordini\" (\"EmailCliente\", \"Data\") VALUES ($1, NOW()) RETURNING \"ID\"', [req.utente.email]);
        const idOrdine = risultatoQueryID.rows[0]["ID"];

        for(const prodotto of carrello) {

            await pool.query('INSERT INTO \"OrdiniProdotti\" (\"IDOrdine\", \"IDProdotto\", \"Quantità\", \"PrezzoTotale\", \"EmailArtigiano\", \"NomeCliente\", \"CognomeCliente\", \"Indirizzo\", \"Provincia\") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [idOrdine, prodotto["ID"], prodotto["quantita"], prodotto["prezzoTotale"], prodotto["email"], nome, cognome, indirizzo, provincia]);
            await pool.query('UPDATE \"ElencoProdotti\" SET \"Quantità\" = \"Quantità\" - $1 WHERE \"ID\" = $2', [Number(prodotto["quantita"]), Number(prodotto["ID"])]);

        }

        res.status(200).json({

            success: true,
            message: 'Ordine effettuato'

        })


    } catch (err) {

        console.error("Errore nella conferma dell'ordine:", err);
        res.status(500).json({

            success: false,
            message: "Errore nell'ordine"
    
        });

    }


});


module.exports = router;