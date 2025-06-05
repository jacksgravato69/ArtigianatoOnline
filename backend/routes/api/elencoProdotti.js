const express = require('express');
const router = express.Router();
const pool = require('../../db/db');
const verificaToken = require('../../middleware/verificaToken');

router.get('/', verificaToken, async(req, res) => {

    try {

        const elencoProdotti = await pool.query('SELECT * FROM \"ElencoProdotti\"');

        res.status(200).json({

            success: true,
            prodotti: elencoProdotti.rows

        })

    } catch (err) {

        console.error(err);
        res.status(500).json({

            success: false,
            message: 'Errore nel recupero dei prodotti'

        });

    }

})

module.exports = router;