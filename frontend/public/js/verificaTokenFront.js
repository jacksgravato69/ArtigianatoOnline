export async function verificaToken() {
    
    fetch('http://localhost:3000/api/verificaToken', {
    
            credentials: 'include'
    
        })
        .then(res => res.json())
        .then(data => {
    
            if(data.success) {
    
                console.log('Token valido, utente:', data.utente);
    
            } else {
    
                alert('Permesso negato')
                window.location.replace('/views/login.html');
    
            }
    
        })

}

