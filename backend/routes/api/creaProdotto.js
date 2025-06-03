const express = require('express');
const router = express.Router();
const verificaToken = require('../../middleware/verificaToken');
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

// Rotta per creare un nuovo prodotto
router.post('/creaProdotto', upload.single('immagine'), async (req, res) => {
  try {
    const { nomeProdotto } = req.body;
    const immaginePath = req.file.filename;

    await pool.query(
      'INSERT INTO "Prodotti" ("Nome", "PercorsoImmagine") VALUES ($1, $2)',
      [nomeProdotto, immaginePath]
    );

    res.status(200).json({ message: "Prodotto salvato con successo!" });
  } catch (err) {
    console.error("Errore nella creazione del prodotto:", err);
    res.status(500).json({ error: "Errore server" });
  }
});


module.exports = router;