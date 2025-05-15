
let username
let email
let password

//Funzione che viene chiamata quando il Cliente preme il tasto per confermare la registrazione
//TODO: aggiungere i controlli per verificare i dati inseriti dall'utente
function registraUtente(tipoCliente) {

    //Prevenire il comportamento predefinito del form per evitare che escano i dati di login nella search bar e non refreshare la pagina
    event.preventDefault();

    let data = {};
    
    if(tipoCliente == "cliente") {
      
      //Definisco in delle variabili i dati inserirti dall'utente
      username = document.getElementById("username").value
      email = document.getElementById("email").value
      password = document.getElementById("password").value

      //Defininisco in delle variabili le informazioni per il metodo di pagamento
      nome = document.getElementById("nome").value
      cognome = document.getElementById("cognome").value
      indirizzo = document.getElementById("indirizzo").value
      numeroCarta = document.getElementById("numeroCarta").value
      dataScadenza = document.getElementById("scadenza").value

        //Inserisco i dati in un oggetto
        data = {
    
            username: username,
            email: email,
            password: password,
            tipoUtente: "cliente",

            nome: nome,
            cognome: cognome,
            indirizzo: indirizzo,
            numeroCarta: numeroCarta,
            dataScadenza: dataScadenza
    
        }

    } else if(tipoCliente == "artigiano") {

      //Definisco in delle variabili i dati inserirti dall'utente
      username = document.getElementById("nomeAzienda").value
      email = document.getElementById("email").value
      password = document.getElementById("password").value

        //Inserisco i dati in un oggetto
        data = {
    
            username: username,
            email: email,
            password: password,
            tipoUtente: "artigiano",

            nome: nome,
            cognome: cognome,
            indirizzo: indirizzo,
            numeroCarta: numeroCarta,
            dataScadenza: dataScadenza
    
        }

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

        //Controllo la risposta del server, se tutto è andato a buon fine, mi reindirizza alla pagina home, altrimenti stampa un errore
    }).then(response => {

        if (response.ok) {

          console.log('Registrazione riuscita, redirigo...');

          if(tipoCliente == "cliente") {

            //Reindirizzo alla pagina di home del cliente
            window.location.replace('/homeCliente');

          } else if(tipoCliente == "artigiano") {

            //Reindirizzo alla pagina di home dell'artigiano
            //TODO: CREARE PAGINA ARTIGIANO
            window.location.replace('/homeCliente');

          }


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

