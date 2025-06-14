import { verificaToken } from './verificaTokenFront.js';
import { indietro } from './indietro.js';

//EventListener che carica i prodotti dal DB quando viene caricato il DOM
document.addEventListener("DOMContentLoaded", function() { 

    verificaToken();

    const prodotto = JSON.parse(localStorage.getItem("prodotto"));

    document.getElementById("nomeProdottoInput").value = prodotto["nome"];
    document.getElementById("descrizioneProdottoInput").textContent = prodotto["descrizione"];
    document.getElementById("quantitaInput").value = prodotto["quantita"];
    document.getElementById("prezzoProdottoInput").value = prodotto["prezzo"];

});

//Funzione per confermare le modifiche del prodotto
document.addEventListener('submit', function(event) {

    event.preventDefault(); 

    if(event.target.classList.contains('formModifica')) {

        const prodotto = JSON.parse(localStorage.getItem("prodotto"));

        const idProdotto = prodotto["ID"];
        const nomeProdotto = document.getElementById("nomeProdottoInput").value;
        const descrizioneProdotto = document.getElementById("descrizioneProdottoInput").value;
        const quantita = document.getElementById("quantitaInput").value;
        const prezzoProdotto = document.getElementById("prezzoProdottoInput").value;


        let data = {

            ID: idProdotto,
            nome: nomeProdotto,
            descrizione: descrizioneProdotto,
            quantita: quantita,
            prezzo: prezzoProdotto

        }

        fetch('http://localhost:3000/api/modificaProdotto', {
    
            method: 'POST',
            headers: {

                'Content-Type': 'application/json'

            },
            body: JSON.stringify(data),
            credentials: 'include'
    
        })
        .then(res => res.json())
        .then(data => {

            if(data.success) {

                alert(data.message);
                window.location.href = '/views/homeA.html';

            } else {

                alert(data.message);

            }

        })

    }

})

//Funzione che modifica la cifra che indica la quantità di prodotti che si vogliono aggiungere
function modificaQuantita(segno) {
    
    let quantitaInput = document.getElementById("quantitaInput");
    let quantita = parseInt(quantitaInput.value);

    if(segno === "+") {

        quantita = quantita + 1;

    } else if(segno === "-") {

        //Evito valori negativi
        quantita = Math.max(0, quantita - 1);

    }

    quantitaInput.value = quantita;

}

function vaiIndietro() {

    indietro();

}

window.vaiIndietro = vaiIndietro;
window.modificaQuantita = modificaQuantita;