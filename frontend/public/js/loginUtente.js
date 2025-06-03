function loginUtente(event) {

    //Prevenire il comportamento predefinito del form per evitare che escano i dati di login nella search bar e non refreshare la pagina
    event.preventDefault();

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    let data = {

        username: username,
        password: password

    }

    //Inoltro la richiesta di login al server passando i dati in formato JSON, e salvo la risposta in una variabile
    const response = fetch('http://localhost:3000/api/login', {

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

            if (data.token) {

                //Salvo il token e l'utente nel localStorage
                localStorage.setItem("token", data.token);
                //Converto il dato utente da formato JSON a stringa dato che il localStorage accetta solo stringhe
                localStorage.setItem("utente", JSON.stringify(data.utente));

                if(data.utente.ruolo === 'artigiano') {

                    //Reindirizzo alla pagina di home dell'artigiano
                    window.location.replace('../../views/homeA.html');

                } else if(data.utente.ruolo === 'cliente') {

                    //Reindirizzo alla pagina di home del cliente
                    window.location.replace('../../views/homeC.html');
    
                } else {

                    alert("Tipo utente non riconosciuto.")

                }

            }


        } else {

            alert('Credenziali errate');
            
        }
    })
    .catch(err => {

        console.error('Errore login:', err);
        alert('Errore di rete o server');

  });

}