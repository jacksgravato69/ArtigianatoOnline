import { verificaToken } from './verificaTokenFront.js';
import { indietro } from './indietro.js';

document.addEventListener("DOMContentLoaded", function() {

    verificaToken();

})



document.addEventListener('click', function(event) {

    if(event.target.classList.contains('modifica')) {

        const segnalazione = document.getElementById('segnalazioneText').value;

        let data = {

            segnalazione: segnalazione

        }

        fetch('http://localhost:3000/api/inviaSegnalazione', {
    
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

                alert(data.message);

                document.getElementById('segnalazioneText').value = "";

            } else {

                alert(data.message);

            }

        })

    }

});



function vaiIndietro() {

    indietro();

}

window.vaiIndietro = vaiIndietro;