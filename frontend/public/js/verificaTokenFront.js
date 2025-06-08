export async function verificaToken() {
    
    fetch('http://localhost:3000/api/verificaToken', {
    
            credentials: 'include'
    
        })
        .then(res => res.json())
        .then(data => {
    
            if(data.success) {
    
    
            } else {
    
                alert('Permesso negato')
                window.location.replace('/views/login.html');
    
            }
    
        })

}

