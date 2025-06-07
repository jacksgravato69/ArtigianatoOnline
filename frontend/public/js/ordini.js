import { verificaToken } from './verificaTokenFront.js';

document.addEventListener("DOMContentLoaded", function() {

    verificaToken();

    fetch('http://localhost:3000/api/elencoOrdini', {
    
        method: 'GET',
        credentials: 'include'
    
    })
    .then(res => res.json())
    .then(data => {

        if(data.success) {

            console.log(data.elencoOrdini);
            mostraOrdini(data);

        } else {

            alert(data.message)

        }
        
    })

})

//Funzione che crea gli elementi HTML per mostrare gli ordini
function mostraOrdini(data) {

    //Definisco in una variabile la section contenente tutta la lista degli ordini
    const elencoOrdini = document.getElementById("ordini-info");

    //La svuoto inserendo solo il titolo e l'intestazione della tabella
    elencoOrdini.innerHTML = `<h3>Dettagli Ordini</h3>
            <table id="ordiniTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cognome</th>
                        <th>Nome</th>
                        <th>Indirizzo</th>
                        <th>Provincia</th>
                        <th>Quantità</th>
                        <th>Totale</th>
                        <th>Stato</th>
                    </tr>
                </thead>
                <tbody id="ordiniBody"></tbody>
            </table>`

    const corpoTabella = document.getElementById('ordiniBody');

    data.elencoOrdini.forEach(ordine => {

        //Creo l'oggetto tr che rappresenta una riga della tabella dove inserirò tutti i dettagli del primo ordine
        const riga = document.createElement('tr');

        //Creo degli oggetti td che definiscono ogni colonna
        const idProdotto = document.createElement('td');
        const cognome = document.createElement('td');
        const nome = document.createElement('td');
        const indirizzo = document.createElement('td');
        const provincia = document.createElement('td');
        const quantità = document.createElement('td');
        const totale = document.createElement('td');
        const stato = document.createElement('td');
        const bottone = document.createElement('button')
        
        idProdotto.textContent = ordine["IDProdotto"]
        cognome.textContent = ordine["CognomeCliente"];
        nome.textContent = ordine["NomeCliente"];
        indirizzo.textContent = ordine["Indirizzo"];
        provincia.textContent = ordine["Provincia"];
        quantità.textContent = ordine["Quantità"];
        totale.textContent = ordine["PrezzoTotale"];
        bottone.textContent = 'Spedito'
        bottone.setAttribute('data-id', ordine["ID"]);
        bottone.className = 'bottoneSpedito';
        stato.appendChild(bottone);

        riga.appendChild(idProdotto);
        riga.appendChild(cognome);
        riga.appendChild(nome);
        riga.appendChild(indirizzo);
        riga.appendChild(provincia);
        riga.appendChild(quantità);
        riga.appendChild(totale);
        riga.appendChild(stato);

        corpoTabella.appendChild(riga);
        
    }) 

}

document.addEventListener('click', function(event) {

    if(event.target.classList.contains('bottoneSpedito')) {

        const idOrdine = event.target.getAttribute('data-id');

        let data = {

            ID: idOrdine

        }

        fetch('http://localhost:3000/api/ordineSpedito', {
    
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

                mostraOrdini(data);

            } else {

                alert(data.message);

            }

        })

    }

})