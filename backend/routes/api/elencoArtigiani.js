const express = require('express');
const router = express.Router();
const verificaToken = require('../../middleware/verificaToken');
const verificaRuolo = require('../../middleware/verificaRuolo');
const pool = require('../../db/db');

router.get('/', verificaToken, verificaRuolo('cliente'), async(req, res) => {

    try {

        const elencoArtigiani = await pool.query('SELECT \"Username\" FROM \"ElencoUtenti\" WHERE \"TipoUtente\" = \'artigiano\'');

        res.status(200).json({

            success: true,
            elencoArtigiani: elencoArtigiani.rows,
            message: 'Elenco ricevuto correttamente'

        })

    } catch (error) {

        console.error("Errore durante la ricerca degli artigiani:", error);
        res.status(500).json({

            success: false,
            message: 'Errore durante la ricerca degli Artigiani'

        })

    }

}) 

module.exports = router;