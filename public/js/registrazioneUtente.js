
let username
let email
let password

function registraUtente() {

    event.preventDefault();

    username = document.getElementById("username").value
    email = document.getElementById("email").value
    password = document.getElementById("password").value

    //Inserisco i dati in un oggetto
    const data = {

        username: username,
        email: email,
        password: password

    }

    //Inoltro la richiesta di registrazione al server per la registrazione passando i dati in formato JSON, e salvo la risposta in una variabile
    const response = fetch('/api/registrazione', {

        //Indico il metodo di richiesta HTTP
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //Indico il corpo, che contiene i dati da inviare al server trasformati in formato HSON
        body: JSON.stringify(data)

    }).then(response => {
        if (response.ok) {
          console.log('Registrazione riuscita, redirigo...');
          window.location.replace('/homeCliente'); // Reindirizza alla pagina di successo
        } else {
          return response.text().then(errorData => {
            console.log('Errore risposta:', errorData);
            alert('Errore durante la registrazione');
          });
        }
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
        alert('Errore nella richiesta');
      });

}

