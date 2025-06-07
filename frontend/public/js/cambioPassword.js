import { verificaToken } from './verificaTokenFront.js';

//Mostro a schermo la domanda di sicurezza che ha selezionato l'utente durante la fase di registrazione
const domandaSicurezza = JSON.parse(localStorage.getItem("utente")).domandaSicurezza;

//Attendo il caricamento del DOM per poi inserire la domanda di sicurezza
document.addEventListener('DOMContentLoaded', function () {

    verificaToken();

    document.getElementById("domandaSicurezza").textContent = domandaSicurezza;

});

//Funzione che manda una richiesta al server per modificare la password
function cambiaPassword(tipoModifica) {

    //Salvo in delle variabili la nuova password, la conferma della nuova password e la risposta alla domanda di sicurezza
    const nuovaPassword = document.getElementById("nuovaPassword").value;
    const confermaNuovaPassword = document.getElementById("confermaNuovaPassword").value;
    const rispostaDomanda = document.getElementById("rispostaSicurezza").value;

    //Prima di inoltrare la richiesta al server, controllo che le 2 password inserite siano uguali, e se non lo sono mostro un messaggio di errore
    //Ho deciso di fare questo controllo qui e non nel backend per evitare di fare una richiesta al server se le password non corrispondono
    if(nuovaPassword !== confermaNuovaPassword) {

        alert("Le password non corrispondono. Riprova.");
        return;

    }

    //Creo un oggetto che contiene i dati da inviare al server
    let data = {

        nuovaPassword: nuovaPassword,
        confermaNuovaPassword: confermaNuovaPassword,
        rispostaDomanda: rispostaDomanda,
        tipoModifica: tipoModifica

    }

    //Faccio una richiesta al server per modificare la password chiamando l'API /api/modifica
    fetch('http://localhost:3000/api/modifica', {

        method: 'POST',
        headers: {

            'Content-Type': 'application/json'

        },

        //Indico il corpo, che contiene i dati da inviare al server trasformati in formato JSON
        body: JSON.stringify(data),
        credentials: 'include'

    })
    .then(res => res.json())
    .then(data => {

        //Controllo se la modifica è andata a buon fine
        if(data.success) {

            alert(data.message);

            document.getElementById("nuovaPassword").value = "";
            document.getElementById("confermaNuovaPassword").value = "";
            document.getElementById("rispostaSicurezza").value = "";
            

        } else {

            alert("Errore durante la modifca della password");

        }   

    })

}

window.cambiaPassword = cambiaPassword;