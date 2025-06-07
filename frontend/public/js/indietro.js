export function indietro() {

    const utente = JSON.parse(localStorage.getItem("utente")).ruolo;
    
    if(utente === 'artigiano') {

        window.location.replace('../../views/homeA.html');

    }

    if(utente === 'cliente') {

        window.location.replace('../../views/homeC.html');

    }


}