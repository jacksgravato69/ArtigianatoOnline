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

                break;


            case 'senzaFiltri':

                const ricerca = req.body.ricerca;

                const risultatoRicerca = await pool.query('SELECT * FROM \"ElencoProdotti\" WHERE \"NomeProdotto\" ILIKE $1', [`%${ricerca}%`]);

                res.status(200).json({
        
                    success: true,
                    prodotti: risultatoRicerca.rows
        
                })

                break;

            case 'conFiltri':

                const {tipoRicerca, campoRicerca, prezzoMax, produttore, tipologia} = req.body;

                console.log("CAMPO RICERCAAAAAAAA, " + campoRicerca);

                let queryArtigiano;
                let emailArtigiano;

                if(produttore) {

                    queryArtigiano = await pool.query('SELECT \"Email\" FROM \"ElencoUtenti\" WHERE \"Username\" = $1', [produttore]);
                    emailArtigiano = queryArtigiano.rows[0]["Email"];

                }

                let queryRicerca = 'SELECT * FROM \"ElencoProdotti\" WHERE 1=1';
                let filtri = [];
                let i = 1;

                if(campoRicerca) {

                    queryRicerca += ` AND \"NomeProdotto\" ILIKE $${i++}`;
                    filtri.push(campoRicerca);

                }

                if(prezzoMax) {

                    queryRicerca += ` AND "Prezzo" <= $${i++}`;
                    filtri.push(prezzoMax);

                }

                if(produttore) {

                    queryRicerca += ` AND "Email" = $${i++}`;
                    filtri.push(emailArtigiano);

                }

                if(tipologia) {

                    queryRicerca += ` AND "Tipologia" = $${i++}`;
                    filtri.push(tipologia);

                }

                try {

                    const risultatoQuery = await pool.query(queryRicerca, filtri);
                    res.status(200).json({

                        success: true,
                        prodotti: risultatoQuery.rows

                    })

                } catch (err) {

                    console.error("Errore nella ricerca con filtri:", err);
                    res.status(500).json({

                        success: false, 
                        message: "Errore nella ricerca filtrata" 

                    });

                }
                

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