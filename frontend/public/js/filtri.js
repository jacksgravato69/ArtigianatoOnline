document.addEventListener("DOMContentLoaded", function() {

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
        const selector = document.getElementById("produttore");

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

        //TODO: Controllare
        produttore = document.getElementById("produttoreCheck").options[document.getElementById("produttoreCheck").selectedIndex].text

    }
    
}