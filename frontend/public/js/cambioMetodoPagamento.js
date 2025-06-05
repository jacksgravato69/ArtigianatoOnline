//Metto un listener per il form che intercetta l'evento di submit, per poi richiamare la funzione cambiaMetodoPagamento
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', function(event) {

        //Prevenire il comportamento predefinito del forrm
        event.preventDefault();

        //Chiamo la funzione per cambiare il metodo di pagamento
        cambiaMetodoPagamento('pagamento');
    });
});


//Funzione per cambiare il metodo di pagamento
function cambiaMetodoPagamento(tipoModifica) {

    //Definisco in delle variabili i valori inseriti dall'utente
    const nome = document.getElementById("nome").value;
    const cognome = document.getElementById("cognome").value;
    const indirizzo = document.getElementById("indirizzo").value;
    const numeroCarta = document.getElementById("numeroCarta").value;
    const scadenza = document.getElementById("scadenza").value;

    let data = {

        nome: nome,
        cognome: cognome,
        indirizzo: indirizzo,
        numeroCarta: numeroCarta,
        scadenza: scadenza,
        tipoModifica: tipoModifica

    }

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

        if(data.success) {

            //Stampo il messaggio di successo
            alert(data.message);

            //Resetto i campi del form
            document.getElementById("nome").value = "";
            document.getElementById("cognome").value = "";
            document.getElementById("indirizzo").value = "";
            document.getElementById("numeroCarta").value = "";
            document.getElementById("scadenza").value = "";


        } else {

            alert(data.message)

        }

    })



}