const verificaToken = require('../../middleware/verificaToken');
const express = require('express');
const router = express.Router();
const pool = require('../../db/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { hashPassword } = require('./registrazione');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', verificaToken, async(req, res) => {

  //req.utente contiene: email, username e ruolo

  const tipoModifica = req.body.tipoModifica;
  
  try {
      
      switch(tipoModifica) {
          
          case "username":

                const {nuovoUsername, vecchiaMail, tipoUtente, tipoModifica} = req.body;

                //Se il nuovo username è uguale a quello attuale, restituisco un messaggio e non faccio nulla
                if (nuovoUsername === req.utente.username) {

                    return res.status(200).json({ 

                        message: "Il nuovo username è uguale a quello attuale. Nessuna modifica effettuata.",
                        token: req.headers.authorization.split(' ')[1], // restituisci il token attuale
                        utente: {

                            email: vecchiaMail,
                            username: nuovoUsername,
                            ruolo: tipoUtente

                        }

                    });

                }

                await pool.query('UPDATE \"ElencoUtenti\" SET \"Username\" = $1 WHERE \"Email\" = $2', [nuovoUsername, req.utente.email]);
        
                //Ricreo il token JWT con il nuovo username
                const token = jwt.sign(
                
                    {
                        email: vecchiaMail,
                        username: nuovoUsername,
                        ruolo: tipoUtente
                
                    },
                    JWT_SECRET,
                    { expiresIn: '2h' }
                
                );
        
                res.status(200).json({ 
        
                    message: "Registrazione avvenuta con successo " + nuovoUsername + req.utente.email,
                    token: token,
                    utente: {
        
                        email: vecchiaMail,
                        username: nuovoUsername,
                        ruolo: tipoUtente
        
                    } 
        
                });

                break;

            case "mail":

                const {vecchioUsername, nuovaMail, tipoUtenteM, tipoModificaM} = req.body;

                //Se la nuova mail è uguale a quella attuale, restituisco un messaggio e non faccio nulla
                if (nuovaMail === req.utente.email) {

                    return res.status(200).json({ 

                        message: "La nuova email è uguale a quella attuale. Nessuna modifica effettuata.",
                        token: req.headers.authorization.split(' ')[1], // restituisci il token attuale
                        utente: {

                            email: nuovaMail,
                            username: vecchioUsername,
                            ruolo: tipoUtenteM

                        }

                    });

                }

                //Controllo la maila è già in uso
                const { rows: emailEsistente } = await pool.query('SELECT * FROM \"ElencoUtenti\" WHERE \"Email\" = $1', [nuovaMail]);

                if (emailEsistente.length > 0) {
                    
                    return res.status(400).json({ error: "L'email è già in uso" });

                }

                //Aggiorno l'email
                await pool.query('UPDATE \"ElencoUtenti\" SET \"Email\" = $1 WHERE \"Email\" = $2', [nuovaMail, req.utente.email]);

                //Ricreo il token JWT con la nuova email
                const newToken = jwt.sign(
                
                    {
                        email: nuovaMail,
                        username: vecchioUsername,
                        ruolo: tipoUtenteM
                
                    },
                    JWT_SECRET,
                    { expiresIn: '2h' }
                
                );

                res.status(200).json({ 
        
                    message: "Modifica avvenuta con successo",
                    token: newToken,
                    utente: {
        
                        email: nuovaMail,
                        username: vecchioUsername,
                        ruolo: tipoUtenteM
        
                    } 
        
                });

                break;

            case "password":

                //Salvo in delle variabili i dati ricevuti dal client
                const {nuovaPassword, confermaNuovaPassword, rispostaDomanda} = req.body;

                //Effettuo una query per cercare l'utente con l'email che ha effettuato la richiesta
                const resultUtente = await pool.query('SELECT * FROM \"ElencoUtenti\" WHERE \"Email\" = $1', [req.utente.email]);

                //Salvo in una variabile l'utente trovato
                const utente = resultUtente.rows[0];

                //Controllo se l'utente esiste, e nel caso non esista restituisco un success a false
                if (!utente) {

                    //Se non esiste, restituisco un success a false che indica un errore
                    return res.status(400).json({ 

                        success: false

                    });

                }

                //Se l'utente esiste, confronto la risposta alla domanda di sicurezza ricevuta con quella salvata nel DB cifrato
                if(await bcrypt.compare(rispostaDomanda, utente["RispostaSicurezza"])) {

                    //Se la risposta è corretto, hasho la nuova password
                    const hashedPassword = await hashPassword(nuovaPassword);

                    //Aggiorno la password dell'utente
                    await pool.query('UPDATE \"ElencoUtenti\" SET \"Password\" = $1 WHERE \"Email\" = $2', [hashedPassword, req.utente.email])

                    res.json({

                        success: true,
                        message: "Password modifica con successo"

                    })

                } else {

                    //Se la risposta è sbagliata, restituisco un success a false che indica un errore
                    return res.status(400).json({ 

                        success: false

                    });

                }


            

        }


    } catch (err) {

        console.error("Errore durante la modifca:", err);
        res.status(500).json({ error: "Errore durante la modifica" });

    }
  
});

module.exports = router;