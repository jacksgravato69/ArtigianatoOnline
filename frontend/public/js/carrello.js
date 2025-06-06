document.addEventListener("DOMContentLoaded", function() {

    caricaCarrello();

});

//Funzione per rimuovere oggetti dal carrello
document.addEventListener('click', function(event) {

    if(event.target.classList.contains('buttRim')) {

        //Prendo la lista degli oggetti aggiunti al carrello fino a quel momento
        const carrelloAttuale = JSON.parse(localStorage.getItem("carrello"));

        const idProdotto = event.target.dataset.id;

        for(i = 0; i < carrelloAttuale.length; i++) {

            if(carrelloAttuale[i]["ID"] === idProdotto) {

                carrelloAttuale.splice(i, 1);

                localStorage.setItem("carrello", JSON.stringify(carrelloAttuale));

                caricaCarrello();

                return;

            }

        }

    }

})

//Funzione che carica la struttura del carrello
function caricaCarrello() {

    //Definisco in una variabile il div del lista degli articoli nel carrello
    const catalogo = document.getElementById('prodotti');

    //Svuoto tutto il div del carrello così da togliere tutte le card statiche (almeno le abbiamo nell'HTML)
    //semplicemente cambiando tutto il contenuto HTML del carrello in un argomento vuoto
    catalogo.innerHTML = '';

    //Prendo la lista degli oggetti aggiunti al carrello fino a quel momento
    const carrello = JSON.parse(localStorage.getItem("carrello"));

    //Setto il counter di prodotti presenti nel carrello
    document.getElementById("count").textContent = carrello.length;

    //Scorro la lista creando per ogni prodotto un elemento in HTML che verrà aggiunto alla lista
    carrello.forEach(prodotto => {

        //Creo un div che contiene tutto il prodotto
        const prodottoDiv = document.createElement('div');
        prodottoDiv.className = 'prodotto';

        //Creo l'oggetto img dove è contenuta l'immagine del prodotto
        const immagineProdotto = document.createElement('img');
        immagineProdotto.src = prodotto["immagine"];
        immagineProdotto.alt = prodotto["nome"];
        immagineProdotto.className = 'imP';

        //Creo il div dove sono contenute le informazioni di ogni elemento
        const infoP = document.createElement('div');
        infoP.className = 'infoP';

        //Creo l'oggetto h3 che rappresenta il nome del prodotto
        const nomeProdotto = document.createElement('h3');
        nomeProdotto.className = 'nomeP';
        nomeProdotto.textContent = prodotto["nome"];

        //Creo un div sono contenuti i pulsanti di azione
        const azioniP = document.createElement('div');
        azioniP.className = 'azioniP';

        //Creo l'oggetto button per rimuovere il prodotto dal cartello
        //TODO: renderlo funzionante
        const bottoneRimuovi = document.createElement('button');
        bottoneRimuovi.className = 'buttRim';
        bottoneRimuovi.textContent = 'Rimuovi';
        bottoneRimuovi.setAttribute('data-id', prodotto["ID"]);

        //Creo l'oggetto break per andare a capo
        const br = document.createElement('br');

        //Creo l'oggetto span con il costo dell'oggetto
        const prezzo = document.createElement('span');
        prezzo.textContent = prodotto["prezzo"] + '€';

        //Creo tutta la struttura dell'oggetto "appendendo" ogni elemento all'altro in ordine
        azioniP.appendChild(bottoneRimuovi);
        infoP.appendChild(nomeProdotto);
        infoP.appendChild(azioniP);
        infoP.appendChild(bottoneRimuovi);
        infoP.appendChild(br)
        infoP.appendChild(prezzo);

        prodottoDiv.appendChild(immagineProdotto);
        prodottoDiv.appendChild(infoP);

        catalogo.appendChild(prodottoDiv);

    })

    console.log(JSON.parse(localStorage.getItem("carrello")))

}