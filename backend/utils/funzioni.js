const bcrypt = require('bcrypt');

async function hashPassword(password) {

    //Definisco il numero di salt rounds (ossia il numero di volte in cui viene applicato l'algoritmo di hashing)
    const saltRounds = 10;

    try {
        
        //Genero il salt (ossia una stringa casuale che viene unita alla password prima dell'hashing per renderla più sicura)
        const salt = await bcrypt.genSalt(saltRounds);
        //Hasho la password con il salt generato
        const hash = await bcrypt.hash(password, salt);

        return hash;

    } catch (error) {
        
        console.error("ERRORE NELLA HASHING DELLA PASSWORD:", error);

    }


}

//Funzione per validare il numero della carta di credito con l'algoritmo di Luhn
function validaCartaConLuhn(numeroCarta) {

    //Rimuove spazi o trattini
    const numeroPulito = numeroCarta.replace(/\D/g, '');

    let somma = 0;
    let doppio = false;

    //Scorri da destra verso sinistra
    for (let i = numeroPulito.length - 1; i >= 0; i--) {

        let cifra = parseInt(numeroPulito[i], 10);

        if (doppio) {

            cifra *= 2;
            if (cifra > 9) cifra -= 9;

        }

        somma += cifra;
        doppio = !doppio;

    }

    //È valida se la somma è multiplo di 10
    return somma % 10 === 0;

}

module.exports = { hashPassword, validaCartaConLuhn };