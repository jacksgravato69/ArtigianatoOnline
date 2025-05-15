function loginUtente() {

    //Prevenire il comportamento predefinito del form per evitare che escano i dati di login nella search bar e non refreshare la pagina
    event.preventDefault();

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    let data = {

        username: username,
        password: password

    }

    //Inoltro la richiesta di login al server passando i dati in formato JSON, e salvo la risposta in una variabile
    const response = fetch('/api/login', {

        //Indico il metodo di richiesta HTTP
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //Indico il corpo, che contiene i dati da inviare al server trasformati in formato JSON
        body: JSON.stringify(data)

        //Controllo la risposta del server, se tutto è andato a buon fine, mi reindirizza alla pagina home, altrimenti stampa un errore
    })
    .then(res => res.json())
    .then(data => {

        //Se tutto è andato a buon fine (quindi success è a true) reindirizzo l'utente alla pagina home cliente
        if (data.success) {

            //Reindirizzo alla pagina di home del cliente
            window.location.replace('/homeCliente');

            /*
            //TODO: gestire il reindirizzamento in base al tipo di utente
            // Redirigi in base al tipo utente
            if (data.tipoUtente === 'cliente') window.location.href = '/homeCliente';
            else if (data.tipoUtente === 'artigiano') window.location.href = '/homeArtigiano';
            */

        } else {

            alert('Credenziali errate');
            
        }
    })
    .catch(err => {

        console.error('Errore login:', err);
        alert('Errore di rete o server');

  });

}