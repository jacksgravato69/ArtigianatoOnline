
let username
let email
let password
let domandaSicurezza
let rispostaSicurezza

//Funzione che viene chiamata quando il Cliente preme il tasto per confermare la registrazione
//TODO: aggiungere i controlli per verificare i dati inseriti dall'utente
function registraUtente(tipoCliente) {

    //Prevenire il comportamento predefinito del form per evitare che escano i dati di login nella search bar e non refreshare la pagina
    event.preventDefault();

    let data = {};
    
    if(tipoCliente == "cliente") {
      
      //Definisco in delle variabili i dati inseriti dall'utente
      username = document.getElementById("username").value
      email = document.getElementById("email").value
      password = document.getElementById("password").value
      //Per ottenere il testo della donmanda di sicurezza seleziono prima l'indice della domanda selezionata, e poi prendo il testo della domanda
      domandaSicurezza = document.getElementById("domandaSicurezza").options[document.getElementById("domandaSicurezza").selectedIndex].text
      rispostaSicurezza = document.getElementById("rispostaSicurezza").value    

      //Defininisco in delle variabili le informazioni per il metodo di pagamento
      nome = document.getElementById("nome").value
      cognome = document.getElementById("cognome").value
      indirizzo = document.getElementById("indirizzo").value
      numeroCarta = document.getElementById("numeroCarta").value
      dataScadenza = document.getElementById("scadenza").value

      //Definisco in delle variabili la domanda e la risposta di sicurezza per l'eventuale recupero della password
      //Per ottenere il testo della donmanda di sicurezza seleziono prima l'indice della domanda selezionata, e poi prendo il testo della domanda
      domandaSicurezza = document.getElementById("domandaSicurezza").options[document.getElementById("domandaSicurezza").selectedIndex].text
      rispostaSicurezza = document.getElementById("rispostaSicurezza").value

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
            dataScadenza: dataScadenza,

            domandaSicurezza: domandaSicurezza,
            rispostaSicurezza: rispostaSicurezza
    
        }

    } else if(tipoCliente == "artigiano") {

      //Definisco in delle variabili i dati inserirti dall'utente
      username = document.getElementById("nomeAzienda").value
      email = document.getElementById("email").value
      password = document.getElementById("password").value

      //Definisco in delle variabili la domanda e la risposta di sicurezza per l'eventuale recupero della password
      //Per ottenere il testo della donmanda di sicurezza seleziono prima l'indice della domanda selezionata, e poi prendo il testo della domanda
      domandaSicurezza = document.getElementById("domandaSicurezza").options[document.getElementById("domandaSicurezza").selectedIndex].text
      rispostaSicurezza = document.getElementById("rispostaSicurezza").value

        //Inserisco i dati in un oggetto
        data = {
    
            username: username,
            email: email,
            password: password,
            tipoUtente: "artigiano",

            //TODO: INSERIRE I CAMPI IN HTML
            nome: nome,
            cognome: cognome,
            indirizzo: indirizzo,
            numeroCarta: numeroCarta,
            dataScadenza: dataScadenza,

            domandaSicurezza: domandaSicurezza,
            rispostaSicurezza: rispostaSicurezza
    
        }

    }


    //Inoltro la richiesta di registrazione al server per la registrazione passando i dati in formato JSON, e salvo la risposta in una variabile
    const response = fetch('http://localhost:3000/api/registrazione', {

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
            window.location.replace('../../views/homeC.html');

          } else if(tipoCliente == "artigiano") {

            //Reindirizzo alla pagina di home dell'artigiano
            //TODO: CREARE PAGINA ARTIGIANO
            window.location.replace('../../views/homeC.html');

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

//Funzione di prova per stampare
function stampa() {

    console.log(document.getElementById("domandaSicurezza").options[document.getElementById("domandaSicurezza").selectedIndex].text)

    const selectedIndex = document.getElementById("domandaSicurezza").selectedIndex;
    const selectedOption = document.getElementById("domandaSicurezza").options[selectedIndex];

}

