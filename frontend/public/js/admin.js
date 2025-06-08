import { verificaToken } from './verificaTokenFront.js';

document.addEventListener("DOMContentLoaded", function() {

    verificaToken();


    fetch('http://localhost:3000/api/infoAdmin', {

        method: 'GET',
        credentials: 'include'

    })
    .then(res => res.json())
    .then(data => {

        if(data.success) {

            mostraUtenti(data);
            mostraOrdini(data);
            mostraSegnalazioni(data);
            
            document.getElementById('numeroOrdini').textContent = data.numeroOrdini;
            document.getElementById('numeroUtenti').textContent = data.numeroUtenti;
            document.getElementById('numeroSegnalazioni').textContent = data.numeroSegnalazioni;

        } else {

            alert(data.message);

        }

    })

    
})

function mostraUtenti(data) {

    const divUtenti = document.getElementById('contenutoUtente');

    divUtenti.innerHTML = `<h3>Elenco Utenti ( <span id="numeroUtenti"> 0 </span> )</h3>
                    
                        <table id="elencoUtentiTable">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Tipo Utente</th>
                                </tr>
                            </thead>
                            <tbody id="utentiBody"></tbody>
                        </table> `

    const bodyUtenti = document.getElementById('utentiBody');


    data.elencoUtente.forEach(utente => {


        const rigaUtente = document.createElement('tr');

        const email = document.createElement('td');
        const username = document.createElement('td');
        const tipoUtente = document.createElement('td');

        email.textContent = utente["Email"];
        username.textContent = utente["Username"];
        tipoUtente.textContent = utente["TipoUtente"];

        rigaUtente.appendChild(email);
        rigaUtente.appendChild(username);
        rigaUtente.appendChild(tipoUtente);
        
        bodyUtenti.appendChild(rigaUtente);

    })

}

function mostraOrdini(data) {

    const divUtenti = document.getElementById('contenutoOrdini');

    divUtenti.innerHTML = `<h3>Elenco Ordini ( <span id="numeroOrdini"> 0 </span> ) </h3>
                    
                        <table id="elencoOrdiniTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email del Cliente</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody id="elencoOrdiniBody"></tbody>
                        </table> `
                        
    const bodyOrdini = document.getElementById('elencoOrdiniBody');


    data.elencoOrdini.forEach(ordine => {

        const rigaOrdine = document.createElement('tr');

        const ID = document.createElement('td');
        const emailCliente = document.createElement('td');
        const data = document.createElement('td');

        ID.textContent = ordine["ID"];
        emailCliente.textContent = ordine["EmailCliente"];

        const dataDB = ordine["Data"];
        const dataObj = new Date(dataDB);

        const formattata = dataObj.toLocaleString('it-IT', {

            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'

        });

        data.textContent = formattata;

        rigaOrdine.appendChild(ID);
        rigaOrdine.appendChild(emailCliente);
        rigaOrdine.appendChild(data);
        
        bodyOrdini.appendChild(rigaOrdine);

    })

}

function mostraSegnalazioni(data) {

    const divUtenti = document.getElementById('contenutoSegnalazioni');

    divUtenti.innerHTML = `<h3>Elenco Segnalazioni ( <span id="numeroSegnalazioni"> 0 </span> ) </h3>
                    
                        <table id="elencoSegnalazioniTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Testo</th>
                                    <th>Tipo utente</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody id="elencoSegnalazioniBody"></tbody>
                        </table> `
                        
    const bodySegnalazioni = document.getElementById('elencoSegnalazioniBody');


    data.elencoSegnalazioni.forEach(segnalazione => {

        const rigaSegnalazione = document.createElement('tr');

        const IDsegnalazione = document.createElement('td');
        const emailSegnalante = document.createElement('td');
        const testo = document.createElement('td');
        const tipoUtenteSegnalante = document.createElement('td');
        const dataSegnalazione = document.createElement('td');

        IDsegnalazione.textContent = segnalazione["ID"];
        emailSegnalante.textContent = segnalazione["EmailSegnalatore"];
        testo.textContent = segnalazione["TestoSegnalazione"];
        tipoUtenteSegnalante.textContent = segnalazione["TipoUtente"];


        const dataDBs = segnalazione["DataSegnalazione"];
        const dataObjs = new Date(dataDBs);

        const formattataS = dataObjs.toLocaleString('it-IT', {

            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'

        });

        dataSegnalazione.textContent = formattataS;

        rigaSegnalazione.appendChild(IDsegnalazione);
        rigaSegnalazione.appendChild(emailSegnalante);
        rigaSegnalazione.appendChild(testo);
        rigaSegnalazione.appendChild(tipoUtenteSegnalante);
        rigaSegnalazione.appendChild(dataSegnalazione);
        
        bodySegnalazioni.appendChild(rigaSegnalazione);

    })

}