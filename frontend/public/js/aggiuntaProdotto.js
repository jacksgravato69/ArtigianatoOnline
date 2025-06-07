import { verificaToken } from './verificaTokenFront.js';


//Metto un listener per il form che intercetta l'evento di submit, per poi richiamare la funzione aggiungiProdotto
document.addEventListener('DOMContentLoaded', function() {

    verificaToken();
    
    //Facendo così blocco l'inserimento della 'e' e dei segni + e - nell'input field di tipo number
    document.getElementById("prezzoProdottoInput").addEventListener("keydown", function(event) {
    
    if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
    
        //Prevengo il comportamento di default quando vengono premuti uno dei pulsanti elencati nell'if
        event.preventDefault();
    
    }
    
    });
    

    document.getElementById("aggiungiProdottoForm").addEventListener('submit', function(event) {

        //Prevenire il comportamento predefinito del forrm
        event.preventDefault();

        //Chiamo la funzione per cambiare il metodo di pagamento
        aggiungiProdotto();

    });
});

//Funzione che si occupa di aggiungere un prodotto inviando una richiesta al server
function aggiungiProdotto() {

    //Creo un oggetto FormData per contenere tutti i dati inseriti dall'utente
    const formData = new FormData();

    formData.append('nomeProdotto', document.getElementById("nomeProdottoInput").value);
    formData.append('immagine', document.getElementById("immagineProdottoInput").files[0]);
    formData.append('descrizioneProdotto', document.getElementById("descrizioneProdottoInput").value);
    formData.append('tipologiaProdotto', document.getElementById("tipologiaProdotto").options[document.getElementById("tipologiaProdotto").selectedIndex].text);
    formData.append('quantita', document.getElementById("quantitaInput").value);
    formData.append('prezzoProdotto', document.getElementById("prezzoProdottoInput").value);

    fetch('http://localhost:3000/api/creaProdotto', {

        method: 'POST',
        body: formData,
        credentials: 'include'

    })
    .then(res => res.json())
    .then(data => {

        console.log("Risposta dal server:", data);
        console.log("funziona? ", data.success)

        if(data.success) {

            //Stampo il messaggio di successo
            alert(data.message);

            /*
            document.getElementById("nomeProdottoInput").value = "";
            document.getElementById("immagineProdottoInput").value =""
            document.getElementById("descrizioneProdottoInput").value = "";
            document.getElementById("quantitaInput").value = 1;
            document.getElementById("prezzoProdottoInput").value = ""; 
            */

            document.getElementById("aggiungiProdottoForm").reset();
            
            console.log("Nome:", document.getElementById("nomeProdottoInput").value);

        } else {

            alert(data.message);

        }

    });

}

//Funzione che modifica la cifra che indica la quantità di prodotti che si vogliono aggiungere
function modificaQuantita(segno) {
    
    let quantitaInput = document.getElementById("quantitaInput");
    let quantita = parseInt(quantitaInput.value);

    if(segno === "+") {

        quantita = quantita + 1;

    } else if(segno === "-") {

        //Evito valori negativi
        quantita = Math.max(1, quantita - 1);

    }

    quantitaInput.value = quantita;

}


window.modificaQuantita = modificaQuantita;