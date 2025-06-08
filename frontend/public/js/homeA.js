import { verificaToken } from './verificaTokenFront.js';

//EventListener che carica i prodotti dal DB quando viene caricato il DOM
document.addEventListener("DOMContentLoaded", function() {

    verificaToken();

    const toggle = document.querySelector(".search-toggle");
    const container = document.querySelector(".search-container");
      
    toggle.addEventListener("click", () => {
        container.classList.toggle("active");
    });

    if(!localStorage.getItem("filtri")) {

        //Creo un oggetto dove è contenuto che tipo di ricerca fare nel server
        let data = {
    
            tipoRicerca: 'completa'
    
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
    
                mostraProdotti(data);
                
            } else {
                
                alert(data.message);
                
            }
            
        })

    } else {

        mostraProdotti(JSON.parse(localStorage.getItem("filtri")));

    }
    
    //Funzione per la ricerca dei prodotti, utilizzata la tecnica del debounce
    
    //Controllo se effettivamente l'utente si trova nel campo di ricerca
    if(document.getElementById("campoRicerca")) {
        
        //Variabile che conterrà il tempo da aspettare
        let debounceTimer;
        
        //Aggiungo un listener ad ogni tipo di input nel campo di ricerca
        document.getElementById("campoRicerca").addEventListener("input", function(event) {
            
            localStorage.setItem("filtri");

            //Salvo in una variabile quello che scrive l'utente
            const ricerca = event.target.value;
            
            //Resetto ogni volta il timer
            clearTimeout(debounceTimer);
            
            //Setto un Timeout che effettua la ricerca solo se non viene premuto nessun pulsante dopo 500ms
            debounceTimer = setTimeout(() => {
                
                
                let data = {
                    
                    ricerca: ricerca,
                    tipoRicerca: 'senzaFiltri'
                    
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

                        mostraProdotti(data);

                    } else {

                        alert(data.message);

                    }
                    
                })
                
                
            }, 500);
            
        })
        
    }
    
    
})

//Funzione per aggiungere prodotti al carrello
document.addEventListener('click', function(event) {
    
    //Siccome le card con i relativi pulsanti vengono creati dinamicamente, ho inserito un EventListener
    //su tutti gli eventi di 'click', e, per non interferire con gli altri pulsanti della pagina, controllo
    //che la classe del pulsante premuto corrisponda ad 'aggiungi', che è il nome della classe che hanno solo
    //i pulsanti delle card, così da far funzionare questa funzione solo per quei pulsanti
    if(event.target.classList.contains('aggiungi')) {
        
        //Recupero il prezzo attuale del carrello
        let prezzoCarrello = parseFloat(localStorage.getItem("prezzoCarrello"));

        //Recupero dal localStorage la lista "carrello" dove salverò tutti gli elementi che voglio aggiungere al carrello
        let carrello = JSON.parse(localStorage.getItem("carrello"))
        
        //Salvo in delle variabili tutti le "informazioni nascoste" che sono nel button di ogni card, contenente tutte le info sul prodotto
        const idProdotto = event.target.dataset.id;
        const nomeProdotto = event.target.dataset.nome;
        const prezzoProdotto = event.target.dataset.prezzo;
        const immagineProdotto = event.target.dataset.immagine;
        const emailArtigiano = event.target.dataset.email;

        //TODO:CONTROLLARE SE VA BENE
        const card = event.target.closest('.card');
        const quantitàElem = card.querySelector('.quantitàRimanente');
        let quantitàNumero = parseInt(quantitàElem.textContent);
        if (quantitàNumero <= 0) {

            alert("Prodotto esaurito!");
            return;

        }
        quantitàNumero--;
        quantitàElem.textContent = quantitàNumero;
        //Recupera o creo l'oggetto delle quantità
        let quantitaAggiornate = JSON.parse(localStorage.getItem("quantitaProdotti")) || {};
        quantitaAggiornate[idProdotto] = quantitàNumero;
        localStorage.setItem("quantitaProdotti", JSON.stringify(quantitaAggiornate));
        
        carrello.push({
            
            ID: idProdotto,
            nome: nomeProdotto,
            prezzo: prezzoProdotto,
            immagine: immagineProdotto,
            email: emailArtigiano
            
        })
        
        
        prezzoCarrello += parseFloat(prezzoProdotto);

        localStorage.setItem("prezzoCarrello", prezzoCarrello);
        localStorage.setItem("carrello", JSON.stringify(carrello));

    }
    
})

//Funzione per mostrare i prodotti
function mostraProdotti(data) {
    
    //Definisco in una variabile la section del catalogo
    const catalogo = document.getElementById('catalogo');
    
    //Svuoto tutta la section catalogo così da togliere tutte le card statiche (almeno le abbiamo nell'HTML)
    //semplicemente cambiando tutto il contenuto HTML del catalogo scrivendo solo il titolo
    catalogo.innerHTML = '<h2>Catalogo<h2>'
    
    //Inizializzo una variabile che rappresenta ogni riga del catalogo
    let row = null;
    
    data.prodotti.forEach((prodotto, index) => {
    
        //Ogni 2 prodotti creo una una nuova riga
        if(index % 3 === 0) {
    
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

        const usernameArtigiano = document.createElement('p');
        usernameArtigiano.textContent = prodotto["Username"];
        card.appendChild(usernameArtigiano);
    
        //Creo l'oggetto p che rappresenta la descrizione del prodotto e lo aggiungo al div che rappresenta la card
        const descrizioneProdotto = document.createElement('p');
        descrizioneProdotto.textContent = prodotto["Descrizione"];
        card.appendChild(descrizioneProdotto);

        const quantitàRimanente = document.createElement('p');
        quantitàRimanente.textContent = prodotto["Quantità"];
        let quantitaAggiornate = JSON.parse(localStorage.getItem("quantitaProdotti")) || {};
        let quantitaDaMostrare = quantitaAggiornate[prodotto["ID"]] !== undefined ? quantitaAggiornate[prodotto["ID"]] : prodotto["Quantità"];
        quantitàRimanente.textContent = quantitaDaMostrare;
        quantitàRimanente.className = 'quantitàRimanente';
        quantitàRimanente.setAttribute('data-id', prodotto["ID"]);
        card.appendChild(quantitàRimanente);

        const prezzo = document.createElement('p');
        prezzo.textContent = prodotto["Prezzo"] + '€';
        card.appendChild(prezzo);
    
        //Creo l'oggetto button che rappresenta il pulsante per aggiungere l'elemento al carrello e lo aggiungo al div che rappresenta la card
        const bottoneAggiungi = document.createElement('button');
        bottoneAggiungi.className = 'aggiungi';
        bottoneAggiungi.textContent = 'Aggiungi al Carrello';
        //Setto delle "informazioni nascoste" che mi servono per quando bisogna aggiungere il prodotto al carrello
        bottoneAggiungi.setAttribute('data-id', prodotto["ID"]);
        bottoneAggiungi.setAttribute('data-nome', prodotto["NomeProdotto"]);
        bottoneAggiungi.setAttribute('data-prezzo', prodotto["Prezzo"]);
        bottoneAggiungi.setAttribute('data-immagine', 'http://localhost:3000/immaginiProdotti/' + prodotto["Immagine"]);
        bottoneAggiungi.setAttribute('data-email', prodotto["Email"]);
        card.appendChild(bottoneAggiungi);
    
        row.appendChild(card);
    
    });
}

//Mostra comunque la pagina nuova senza prendere quella dalla cache, così quando rimuovo un elemento dal carrello torna disponibile nella pagian home
window.addEventListener('pageshow', function(event) {

    if(!localStorage.getItem("filtri")) {

        let data = { 

            tipoRicerca: 'completa' 

        };

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

                mostraProdotti(data);

            }
                
        });

    } else {

        mostraProdotti(JSON.parse(localStorage.getItem("filtri")));
        
    }
});