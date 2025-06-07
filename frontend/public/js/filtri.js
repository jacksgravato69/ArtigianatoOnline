import { verificaToken } from './verificaTokenFront.js';

document.addEventListener("DOMContentLoaded", function() {

    verificaToken();

    //Facendo così blocco l'inserimento della 'e' e dei segni + e - nell'input field di tipo number
    document.getElementById("prezzoProdottoInput").addEventListener("keydown", function(event) {
    
        if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
    
            //Prevengo il comportamento di default quando vengono premuti uno dei pulsanti elencati nell'if
            event.preventDefault();
    
        }
    
    });

    fetch('http://localhost:3000/api/elencoArtigiani', {

        method: 'GET',
        credentials: 'include'

    })
    .then(res => res.json())
    .then(data => {

        //Definisco in una variabilie l'oggetto che contiene tutte le opzioni
        const selector = document.getElementById("produttoreSelect");

        if(data.success) {

            data.elencoArtigiani.forEach(artigiano => {
                
                //Creo l'oggetto che rappresenta una opzione
                const option = document.createElement('option');
                option.text = artigiano["Username"];
                selector.add(option);

            });

        } else {

            alert(data.message);

        }

    })

})


//Funzione che effettua la ricerca in base ai filtri
function effettuaRicerca() {

    //Creo le variabili in cui inseriò gli eventuali filtri
    let ricerca;
    let prezzoMax;
    let produttore;
    let tipologia;

    let isRicercaPiena = document.getElementById("campoRicerca").value;
    let isPrezzoChecked = document.getElementById("prezzoMaxCheck").checked;
    let isProduttoreChecked = document.getElementById("produttoreCheck").checked;
    let isTipologiaChecked = document.getElementById("tipologiaCheck").checked;

    if(isRicercaPiena === '' && isPrezzoChecked === false && isProduttoreChecked === false && isTipologiaChecked === false) {

        alert('Selezionare dei filtri oppure tornare indietro');
        return;

    }
    
    
    if(isRicercaPiena !== '') {

        ricerca = isRicercaPiena;

    }

    if(isPrezzoChecked === true) {

        if(document.getElementById("prezzoProdottoInput").value === '') {

            alert('Inserire un prezzo valido');
            return;

        }

        prezzoMax = document.getElementById("prezzoProdottoInput").value;

    }

    if(isProduttoreChecked === true) {

        produttore = document.getElementById("produttoreSelect").options[document.getElementById("produttoreSelect").selectedIndex].text;

    }

    if(isTipologiaChecked === true) {

        tipologia = document.getElementById("tipologia").options[document.getElementById("tipologia").selectedIndex].text;

    }

    let data = {

        tipoRicerca: 'conFiltri',
        campoRicerca: ricerca,
        prezzoMax: prezzoMax,
        produttore: produttore,
        tipologia: tipologia

    }

    fetch('http://localhost:3000/api/elencoProdotti', {

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

            localStorage.setItem("filtri", JSON.stringify(data));
            window.location.replace('../../views/homeC.html');

        } else {

            alert(data.message)

        }

    })
    
}

window.effettuaRicerca = effettuaRicerca;