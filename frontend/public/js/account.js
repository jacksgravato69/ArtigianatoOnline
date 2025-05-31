console.log(localStorage.getItem("utente"));

let username = JSON.parse(localStorage.getItem("utente")).username;
let email = JSON.parse(localStorage.getItem("utente")).email;
let tipoUtente = JSON.parse(localStorage.getItem("utente")).ruolo;

let spanUsername, inputUsername, spanMail, inputMail;

//Attendo il caricamento del DOM per poi inserire i dati dell'utente che sono stati salvati nel localStorage durante il login o registrazione
document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById("usernameSpan").textContent = username;
    document.getElementById("mailSpan").textContent = email;

    //Salvo in delle variabili l'input che servirà per cambiare l'username e lo span dove viene mostrata a schermo lo username
    spanUsername = document.getElementById("usernameSpan");
    inputUsername = document.getElementById("usernameInput");

    //Salvo in delle variabili l'input che servirà per cambiare la mail e lo span dove viene mostrata a schermo la mail
    spanMail = document.getElementById("mailSpan");
    inputMail = document.getElementById("mailInput");

});

//Funzione per rendere modificabile il campo
function modificaCampo(tipoModifica) {

    switch(tipoModifica) {

        case "username":

            //Copia il valore dallo span nell'input
            inputUsername.value = spanUsername.textContent;

            //Rimuovo lo span e mostro l'input
            spanUsername.hidden = true;
            inputUsername.hidden = false;
            
            //Metto il focus sull'input per mostrare all'utente da dove modificare lo username
            inputUsername.focus();

            //"Nascondo" il pulsante per modificare l'username e mostro quello per confermare le modifiche
            document.getElementById("modificaUsername").hidden = true;
            document.getElementById("confermaModificaUsername").hidden = false;

            break;
        
        case "mail":

            //Copia il valore dallo span nell'input
            inputMail.value = spanMail.textContent;

            //Rimuovo lo span e mostro l'input
            spanMail.hidden = true;
            inputMail.hidden = false;
            
            //Metto il focus sull'input per mostrare all'utente da dove modificare la mail
            inputMail.focus();

            //"Nascondo" il pulsante per modificare l'username e mostro quello per confermare le modifiche
            document.getElementById("modificaMail").hidden = true;
            document.getElementById("confermaModificaMail").hidden = false;
            break;

    }    

}

function modifica(tipoModifica) {

    switch(tipoModifica) {

        case "username":

            const nuovoUsername = document.getElementById("usernameInput").value;

            let dataUsername = {

                nuovoUsername: nuovoUsername,
                vecchiaMail: email,
                tipoUtente: tipoUtente,
                tipoModifica: tipoModifica

            }

            fetch('http://localhost:3000/api/modifica', {

                method: 'POST',
                headers: {

                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'

                },
                //Indico il corpo, che contiene i dati da inviare al server trasformati in formato JSON
                body: JSON.stringify(dataUsername)

            })
            .then(res => res.json())
            .then(data => {

                //Salvo il token e l'utente nel localStorage
                localStorage.setItem("token", data.token);
                //Converto il dato utente da formato JSON a stringa dato che il localStorage accetta solo stringhe
                localStorage.setItem("utente", JSON.stringify(data.utente));
                
                //Rimuovo l'input e mostro lo span
                spanUsername.hidden = false;
                inputUsername.hidden = true;
                
                //Aggiorno lo span con il nuovo username
                spanUsername.textContent = JSON.parse(localStorage.getItem("utente")).username;


                //"Nascondo" il pulsante per confermare l'username e mostro quello per modificare le informazioni
                document.getElementById("modificaUsername").hidden = false;
                document.getElementById("confermaModificaUsername").hidden = true;

            }).catch(err => {

                console.error('Errore nella modifica dello username: ' + err);
                alert('Errore nella modifica dello username');

            })

            break;

        case "mail":

        if (!inputMail.checkValidity()) {

            alert("Inserisci un'email valida.");
            return;

        }

        const nuovaMail = document.getElementById("mailInput").value;

            let dataMail = {

                vecchioUsername: username,
                nuovaMail: nuovaMail,
                tipoUtente: tipoUtente,
                tipoModifica: tipoModifica

            }

            fetch('http://localhost:3000/api/modifica', {

                method: 'POST',
                headers: {

                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'

                },
                //Indico il corpo, che contiene i dati da inviare al server trasformati in formato JSON
                body: JSON.stringify(dataMail)

            })
            .then(res => res.json())
            .then(data => {

                //Salvo il token e l'utente nel localStorage
                localStorage.setItem("token", data.token);
                //Converto il dato utente da formato JSON a stringa dato che il localStorage accetta solo stringhe
                localStorage.setItem("utente", JSON.stringify(data.utente));

                console.log("appost");
                
                //Rimuovo l'input e mostro lo span
                spanMail.hidden = false;
                inputMail.hidden = true;
                
                console.log("appost1");

                //Aggiorno lo span con la nuova mail
                spanMail.textContent = JSON.parse(localStorage.getItem("utente")).email;

                console.log("appost2");

                //"Nascondo" il pulsante per confermare la mail e mostro quello per modificare le informazioni
                document.getElementById("modificaMail").hidden = false;
                document.getElementById("confermaModificaMail").hidden = true;

            }).catch(err => {

                console.error('Errore nella modifica della mail: ' + err);
                alert('Errore nella modifica della mail');

            })

    }

}
