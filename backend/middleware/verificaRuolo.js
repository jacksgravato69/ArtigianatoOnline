function verificaRuolo(ruoloRichiesto) {

  return (req, res, next) => {
    
    if (!req.utente || req.utente.ruolo !== ruoloRichiesto) {

      return res.status(403).json({

        messagge: 'Accesso negato: ruolo non autorizzato'

    });

    }

    next();

  };

}

module.exports = verificaRuolo;