# ArtigianatoOnline

# COME AVVIARE LA WEB APP

# WINDOWS

*Se è la prima volta che si avvia*
 1. Premere 2 volte sul file 'start.bat'
 2. Cercare sul proprio browser 'http://localhost:8080/'

*Se si desidera restartare ricaricando il DB*
 1. Premere 2 volte sul file 'restart.bat'
 2. Cercare sul proprio browser 'http://localhost:8080/'


# MACOS/LINUX

*Se è la prima volta che si avvia*
 1. Dirigersi nella cartella del progetto da terminale
 2. Inserire il comando 'chmod +x start.sh' per dare i permessi di esecuzione
 3. Infine avviare lo script inserendo nel terminale sempre nella cartella del progetto il comando './start.sh'

*Se si desidera restartare ricaricando il DB*
 1. Dirigersi nella cartella del progetto da terminale
 2. Inserire il comando 'chmod +x reset.sh' per dare i permessi di esecuzione
 3. Infine avviare lo script inserendo nel terminale sempre nella cartella del progetto il comando './reset.sh'


--------------------------------------------------------------------------------------------------------------------------------

# UTENTI DI PROVA
**ADMIN**
Email: admin123$$
Password: admin123$$

**Cliente**
Email: Paolo@gmail.com
Password: Paolo
Risposta di Sicurezza: Giallo

**Artigiano**
Email: napoli@gmail.com
Password: napoli
Risposta di Sicurezza: Napoli

**Cliente**
Email: giorgi63@gmail.com
Password: giorgione35
Risposta di Sicurezza: Varese

# ACCEDERE ALLA CONSOLE DEL DB

docker exec -it artigianatoonline-db-1 psql -U jackchiara -d artigianatoonline


docker compose run backend npm test