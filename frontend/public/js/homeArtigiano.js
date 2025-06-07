import { verificaToken } from './verificaTokenFront.js';

//EventListener che carica i prodotti dal DB quando viene caricato il DOM
document.addEventListener("DOMContentLoaded", function() {

    verificaToken();

        //Creo un oggetto dove è contenuto che tipo di ricerca fare nel server
        let data = {
    
            tipoRicerca: 'prodottiArtigiano'
    
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
    
            console.log(data.prodotti[0]["Email"]);
    
            if(data.success) {
    
                mostraProdottiArtigiano(data);
                
            } else {
                
                alert(data.message);
                
            }
            
        })
    
    
})

//Funzione per mostrare i prodotti
function mostraProdottiArtigiano(data) {
    
    //Definisco in una variabile la section del catalogo
    const catalogo = document.getElementById('catalogo');
    
    //Svuoto tutta la section catalogo così da togliere tutte le card statiche (almeno le abbiamo nell'HTML)
    //semplicemente cambiando tutto il contenuto HTML del catalogo scrivendo solo il titolo
    catalogo.innerHTML = '<h2>Prodotti<h2>'
    
    //Inizializzo una variabile che rappresenta ogni riga del catalogo
    let row = null;
    
    data.prodotti.forEach((prodotto, index) => {
    
        //Ogni 2 prodotti creo una una nuova riga
        if(index % 2 === 0) {
    
            row = document.createElement('div');
            row.className = 'row';
            //Inserisco la riga nel catalogo
            catalogo.appendChild(row);
    
        }
    
        //Comincio a creare le card che rappresentano ognuna un prodotto
        const card = document.createElement('div');
        card.className = 'card';
    
        //Creo l'oggetto img dove è contenuta l'immagine del prodotto e lo aggiungo al div che rappresenta la card
        const immagineProdotto = document.createElement('img');
        immagineProdotto.src = 'http://localhost:3000/immaginiProdotti/' + prodotto["Immagine"];
        immagineProdotto.alt = prodotto["NomeProdotto"];
        card.appendChild(immagineProdotto);
    
        //Creo  l'oggetto h3 che rappresenta il nome del prodotto e lo aggiungo al div che rappresenta la card
        const titoloProdotto = document.createElement('h3');
        titoloProdotto.textContent = prodotto["NomeProdotto"];
        card.appendChild(titoloProdotto);
    
        //Creo l'oggetto p che rappresenta la descrizione del prodotto e lo aggiungo al div che rappresenta la card
        const descrizioneProdotto = document.createElement('p');
        descrizioneProdotto.textContent = prodotto["Descrizione"];
        card.appendChild(descrizioneProdotto);

        const quantitàRimanente = document.createElement('p');
        quantitàRimanente.textContent = 'Qta ' + prodotto["Quantità"];
        let quantitaAggiornate = JSON.parse(localStorage.getItem("quantitaProdotti")) || {};
        let quantitaDaMostrare = quantitaAggiornate[prodotto["ID"]] !== undefined ? quantitaAggiornate[prodotto["ID"]] : prodotto["Quantità"];
        quantitàRimanente.textContent = 'Qta: ' + quantitaDaMostrare;
        quantitàRimanente.className = 'quantitàRimanente';
        quantitàRimanente.setAttribute('data-id', prodotto["ID"]);
        card.appendChild(quantitàRimanente);

        const prezzo = document.createElement('p');
        prezzo.textContent = prodotto["Prezzo"] + '€';
        card.appendChild(prezzo);

        const ID = document.createElement('strong');
        ID.textContent = 'ID: ' + prodotto["ID"];
        card.appendChild(ID);

    
        //Creo l'oggetto button che rappresenta il pulsante per modificare il prodotto lo aggiungo al div che rappresenta la card
        const bottoneModifica = document.createElement('button');
        bottoneModifica.className = 'modifica';
        bottoneModifica.textContent = 'Modifica prodotto';
        //Setto delle "informazioni nascoste" che mi servono per quando bisogna modificare il prodotto
        bottoneModifica.setAttribute('data-id', prodotto["ID"]); 
        bottoneModifica.setAttribute('data-nome', prodotto["NomeProdotto"]);
        bottoneModifica.setAttribute('data-descrizione', prodotto["Descrizione"]);
        bottoneModifica.setAttribute('data-quantita', prodotto["Quantità"]);
        bottoneModifica.setAttribute('data-prezzo', prodotto["Prezzo"]);
        card.appendChild(bottoneModifica);
    
        row.appendChild(card);
    
    });
}

//Funzione per andare alla pagina di modifica del prodotto
document.addEventListener('click', function(event) {

    if(event.target.classList.contains('modifica')) {

        const idProdotto = event.target.dataset.id;
        const nomeProdotto = event.target.dataset.nome;
        const descrizioneProdotto = event.target.dataset.descrizione;
        const quantitaProdotto = event.target.dataset.quantita;
        const prezzo = event.target.dataset.prezzo;

        const prodotto = {
            
            ID: idProdotto,
            nome: nomeProdotto,
            descrizione: descrizioneProdotto,
            quantita: quantitaProdotto,
            prezzo: prezzo
            
        }

        localStorage.setItem("prodotto", JSON.stringify(prodotto));

        window.location.href = '/views/modificaProdotto.html';

    }

});