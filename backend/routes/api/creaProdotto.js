const express = require('express');
const router = express.Router();
const verificaToken = require('../../middleware/verificaToken');
const verificaRuolo = require('../../middleware/verificaRuolo');
const pool = require('../../db/db');
const multer = require('multer');
const path = require('path');

//configuro multer indicando dove salvare le immagini (in uploads/) e come chiamarle
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, 'immaginiProdotti/');

  },
  filename: (req, file, cb) => {

    const nomeFile = Date.now() + '-' + file.originalname;
    cb(null, nomeFile);

  }

});

const upload = multer({ storage });

//'immagine' è il name del campo HTML dell'input per le foto
router.post('/', verificaToken, verificaRuolo('artigiano'), upload.single('immagine'), async (req, res) => {

  try {
    
    const {nomeProdotto, immagineProdotto, descrizioneProdotto, tipologiaProdotto, quantita, prezzoProdotto} = req.body;
    const immaginePath = req.file.filename;

    await pool.query('INSERT INTO \"ElencoProdotti\" (\"Email\", \"NomeProdotto\", \"Immagine\", \"Descrizione\", \"Tipologia\", \"Quantità\", \"Prezzo\") VALUES ($1, $2, $3, $4, $5, $6, $7)',[req.utente.email, nomeProdotto, immaginePath, descrizioneProdotto, tipologiaProdotto, quantita, prezzoProdotto]);

    res.status(200).json({

        message: "Prodotto salvato con successo!",
        success: true
    
    });

  } catch (err) {

    console.error("Errore nella creazione del prodotto:", err);
    res.status(500).json({

        success: false,
        message: "Errore nella creazione del prodotto"
    
    });

  }

});


module.exports = router;