document.addEventListener("DOMContentLoaded", function() { 

    //Recupero il prezzo attuale del carrello
    const prezzoCarrello = parseFloat(localStorage.getItem("prezzoCarrello"));

    document.getElementById("costoTotale").textContent = prezzoCarrello;

});

//Funzione per confermare il pagamento
document.addEventListener('click', function(event) {

    event.preventDefault();

    if(event.target.classList.contains('paga')) {

        const carrello = JSON.parse(localStorage.getItem("carrello"));
        
        //Aggrego gli elementi, così se il cliente ha ordinato più quantità dello stesso prodotto risulterà su una riga
        const carrelloAggregato = {};
        
        carrello.forEach(prodotto => {

            //Salvo in una variabalie l'ID del prodotto attuale
            const key = prodotto.ID;
            
            //Controllo se non ci sia già nel nuovo oggetto carrello che sto creando, nel caso inserisco gli attributi del prodotto aggiungendo l'attributo quantità settandolo a 1
            if (!carrelloAggregato[key]) {
                
                carrelloAggregato[key] = {
                    ...prodotto,
                    quantita: 1,
                    prezzoTotale: parseFloat(prodotto["prezzo"])
                };
                
            //Se c'è già, aumento l'attributo quantità di 1
            } else {
                
                carrelloAggregato[key].quantita += 1;
                carrelloAggregato[key].prezzoTotale += parseFloat(prodotto.prezzo);
                
            }

        });
        
        const nome = document.getElementById("nome").value;
        const cognome = document.getElementById("cognome").value;
        const indirizzo = document.getElementById("indirizzo").value;
        const provincia = document.getElementById("provincia").value

        let data = {

            carrello: Object.values(carrelloAggregato),
            nome: nome,
            cognome: cognome,
            indirizzo: indirizzo,
            provincia: provincia

        }

        console.log("Carrello ", carrelloAggregato);

        fetch('http://localhost:3000/api/confermaOrdine', {
    
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

                //Reindirizzo alla pagina di home del cliente
                window.location.replace('../../views/homeC.html');

            } else {

                alert(data.message);

            }

        })

        //console.log(carrello[1]["ID"]);

    }

});