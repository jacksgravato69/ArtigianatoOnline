//Metto un listener per il form che intercetta l'evento di submit, per poi richiamare la funzione aggiungiProdotto
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('aggiungiProdottoForm').addEventListener('submit', function(event) {

        //Prevenire il comportamento predefinito del forrm
        event.preventDefault();

        //Chiamo la funzione per cambiare il metodo di pagamento
        aggiungiProdotto();

    });
});

//Funzione che si occupa di aggiungere un prodotto inviando una richiesta al server
function aggiungiProdotto() {

    //Creo un oggetto FormData che contiene tutti i dati inseriti nel form dall'utente
    const formData = new FormData(document.getElementById('aggiungiProdottoForm'));

    fetch('http://localhost:3000/api/creaProdotto', {

        method: 'POST',
        headers: {

            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            
        },
        body: formData

    })

}