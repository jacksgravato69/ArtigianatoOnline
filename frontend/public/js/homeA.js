//EventListener che carica i prodotti dal DB quando viene caricato il DOM
document.addEventListener("DOMContentLoaded", function() {

    fetch('http://localhost:3000/api/elencoProdotti', {

        method: 'GET',
        credentials: 'include'

    })
    .then(res => res.json())
    .then(data => {

        console.log(data.prodotti[0]["Email"]);

        if(data.success) {

            //Definisco in una variabile la section del catalogo
            const catalogo = document.getElementById('catalogo');

            //Svuoto tutta la section catalogo così da togliere tutte le card statiche (almeno le abbiamo nell'HTML)
            //semplicemente cambiando tutto il contenuto HTML del catalogo scrivendo solo il titolo
            catalogo.innerHTML = '<h2>Catalogo<h2>'

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

                //Creo l'oggetto button che rappresenta il pulsante per aggiungere l'elemento al carrello e lo aggiungo al div che rappresenta la card
                const bottoneAggiungi = document.createElement('button');
                bottoneAggiungi.className = 'aggiungi';
                bottoneAggiungi.textContent = 'Aggiungi al Carrello';
                //Setto delle "informazioni nascoste" che mi servono per quando bisogna aggiungere il prodotto al carrello
                bottoneAggiungi.setAttribute('data-id', prodotto["ID"]);
                bottoneAggiungi.setAttribute('data-nome', prodotto["NomeProdotto"]);
                bottoneAggiungi.setAttribute('data-prezzo', prodotto["Prezzo"]);
                bottoneAggiungi.setAttribute('data-immagine', 'http://localhost:3000/immaginiProdotti/' + prodotto["Immagine"]);
                card.appendChild(bottoneAggiungi);

                row.appendChild(card);

            });


        } else {

            alert(data.message);

        }

    })


})

//Funzione per aggiungere prodotti al carrello
document.addEventListener('click', function(event) {

    console.log("ascoltato")

    //Siccome le card con i relativi pulsanti vengono creati dinamicamente, ho inserito un EventListener
    //su tutti gli eventi di 'click', e, per non interferire con gli altri pulsanti della pagina, controllo
    //che la classe del pulsante premuto corrisponda ad 'aggiungi', che è il nome della classe che hanno solo
    //i pulsanti delle card, così da far funzionare questa funzione solo per quei pulsanti
    if(event.target.classList.contains('aggiungi')) {

        console.log("confermato")

        //Recupero dal localStorage la lista "carrello" dove salverò tutti gli elementi che voglio aggiungere al carrello
        let carrello = JSON.parse(localStorage.getItem("carrello"))

        //Salvo in delle variabili tutti le "informazioni nascoste" che sono nel button di ogni card, contenente tutte le info sul prodotto
        const idProdotto = event.target.dataset.id;
        const nomeProdotto = event.target.dataset.nome;
        const prezzoProdotto = event.target.dataset.prezzo;
        const immagineProdotto = event.target.dataset.immagine;

        console.log(immagineProdotto);

        carrello.push({

            ID: idProdotto,
            nome: nomeProdotto,
            prezzo: prezzoProdotto,
            immagine: immagineProdotto

        })

        console.log(carrello);

        localStorage.setItem("carrello", JSON.stringify(carrello));

    }

})