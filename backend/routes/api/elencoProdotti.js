const express = require('express');
const router = express.Router();
const pool = require('../../db/db');
const verificaToken = require('../../middleware/verificaToken');

router.post('/', verificaToken, async(req, res) => {

    const tipoRicerca = req.body.tipoRicerca;

    try {

        switch(tipoRicerca) {

            case 'completa':

                const elencoProdotti = await pool.query('SELECT * FROM \"ElencoProdotti\"');
        
                res.status(200).json({
        
                    success: true,
                    prodotti: elencoProdotti.rows
        
                })


            case 'senzaFiltri':

                const ricerca = req.body.ricerca;

                const risultatoRicerca = await pool.query('SELECT * FROM \"ElencoProdotti\" WHERE \"NomeProdotto\" ILIKE $1', [`%${ricerca}%`]);

                res.status(200).json({
        
                    success: true,
                    prodotti: risultatoRicerca.rows
        
                })
                

        }


    } catch (err) {

        console.error(err);
        res.status(500).json({

            success: false,
            message: 'Errore nel recupero dei prodotti'

        });

    }

})

module.exports = router;