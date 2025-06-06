
let username
let email
let password
let domandaSicurezza
let rispostaSicurezza

//Metto un listener per il form che intercetta l'evento di submit, per poi richiamare la funzione registraUtente
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('registrationForm').addEventListener('submit', function(event) {

        //Prevenire il comportamento predefinito del form per evitare che escano i dati di login nella search bar e non refreshare la pagina
        event.preventDefault();

        //Ottengo il tipo di utente che si sta registrando dal data-attribute del form
        const tipoUtente = document.getElementById("registrationForm").dataset.tipoutente;

        //Chiamo la funzione per registrare l'utente
        registraUtente(tipoUtente);

    });

});

//Funzione che viene chiamata quando il Cliente preme il tasto per confermare la registrazione
//TODO: aggiungere i controlli per verificare i dati inseriti dall'utente
function registraUtente(tipoCliente) {

    let data = {};

    console.log("Tipo cliente:", tipoCliente);
    
    if(tipoCliente == "cliente") {
      
      //Definisco in delle variabili i dati inseriti dall'utente
      username = document.getElementById("username").value
      email = document.getElementById("email").value
      password = document.getElementById("password").value   

      //Defininisco in delle variabili le informazioni per il metodo di pagamento
      nome = document.getElementById("nome").value
      cognome = document.getElementById("cognome").value
      indirizzo = document.getElementById("indirizzo").value
      numeroCarta = document.getElementById("numeroCarta").value
      dataScadenza = document.getElementById("scadenza").value

      console.log("Numero carta ", numeroCarta)
      console.log("mail", email)

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

      //Defininisco in delle variabili le informazioni per il metodo di pagamento
      nome = document.getElementById("nome").value
      cognome = document.getElementById("cognome").value
      indirizzo = document.getElementById("indirizzo").value
      numeroCarta = document.getElementById("numeroCarta").value
      dataScadenza = document.getElementById("scadenza").value

      console.log("Numero carta ", numeroCarta)
      console.log("mail", email)

      //Definisco in delle variabili la domanda e la risposta di sicurezza per l'eventuale recupero della password
      //Per ottenere il testo della domanda di sicurezza seleziono prima l'indice della domanda selezionata, e poi prendo il testo della domanda
      domandaSicurezza = document.getElementById("domandaSicurezza").options[document.getElementById("domandaSicurezza").selectedIndex].text
      rispostaSicurezza = document.getElementById("rispostaSicurezza").value

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
            dataScadenza: dataScadenza,

            domandaSicurezza: domandaSicurezza,
            rispostaSicurezza: rispostaSicurezza
    
        }

    }

    console.log("Dati inviati:", data);

    //Inoltro la richiesta di registrazione al server per la registrazione passando i dati in formato JSON, e salvo la risposta in una variabile
    const response = fetch('http://localhost:3000/api/registrazione', {

        //Indico il metodo di richiesta HTTP
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //Indico il corpo, che contiene i dati da inviare al server trasformati in formato JSON
        body: JSON.stringify(data),
        credentials: 'include'

        //Controllo la risposta del server, se tutto è andato a buon fine, mi reindirizza alla pagina home, altrimenti stampa un errore
    })
    .then(res => res.json())
    .then(data => {

        if (data.success) {

          if(tipoCliente == "cliente") {

            //Creo una lista che conterrà i prodotti aggiunti al carrello
            localStorage.setItem("carrello", JSON.stringify([]));

            //Salvo l'utente nel localStorage
            //Converto il dato utente da formato JSON a stringa dato che il localStorage accetta solo stringhe
            localStorage.setItem("utente", JSON.stringify(data.utente));

            //Creo una variabile che determina il prezzo del carrello
            let prezzoCarrello = 0;
            localStorage.setItem("prezzoCarrello", prezzoCarrello);

            //Reindirizzo alla pagina di home del cliente
            window.location.replace('../../views/homeC.html');

          } else if(tipoCliente == "artigiano") {

            //Creo una lista che conterrà i prodotti aggiunti al carrello
            localStorage.setItem("carrello", JSON.stringify([]));

            //Salvo l'utente nel localStorage
            //Converto il dato utente da formato JSON a stringa dato che il localStorage accetta solo stringhe
            localStorage.setItem("utente", JSON.stringify(data.utente));
            
            //Reindirizzo alla pagina di home dell'artigiano
            window.location.replace('../../views/homeA.html');

          }


        } else {

            alert('Errore durante la registrazione', data.message);

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

