const express = require('express');
const router = express.Router();
const verificaToken = require('../../middleware/verificaToken');

router.get('/', verificaToken, (req, res) => {

    res.status(200).json({

        success: true,
        utente: req.utente

    });

});

module.exports = router;