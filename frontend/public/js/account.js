console.log(localStorage.getItem("utente"));
let username = JSON.parse(localStorage.getItem("utente")).username;
const email = JSON.parse(localStorage.getItem("utente")).email;

//Attendo il caricamento del DOM per poi inserire i dati dell'utente che sono stati salvati nel localStorage durante il login o registrazione
document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById("username").textContent = username;
    document.getElementById("email").textContent = email;

});

//Funzione per rendere modificabile il campo
function modificaCampo(tipoModifica) {

    switch(tipoModifica) {

        case "username":
            document.getElementById("username").contentEditable = true;
            document.getElementById("username").focus();
            document.getElementById("modificaUsername").hidden = true;
            document.getElementById("confermaModificaUsername").hidden = false;
            break;
        
        case "mail":
            document.getElementById("email").contentEditable = true;
            document.getElementById("email").focus();
            document.getElementById("modificaMail").hidden = true;
            document.getElementById("confermaModificaMail").hidden = false;
            break;

    }    

}
