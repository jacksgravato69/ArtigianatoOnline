# ArtigianatoOnline

# INSERIRE NUOVO DATABASE

1. **Spegni i container** (da Terminale nella cartella dove è presente tutto il progetto)
    docker-compose down

2. **Rimuovi il vecchio DB** (sempre da Terminale nella cartella dove è presente tutto il progetto)
    rmdir /s /q db-docker (Windows)
    rm -rf db-docker (macOS)

3. **Riavvia i container**
    docker compose up --build


# UTENTI DI PROVA
**Cliente**
Email: Paolo@gmail.com
Password: Paolo
Risposta di Sicurezza: Giallo

**Artigiano**
Email: napoli@gmail.com
Password: napoli
Risposta di Sicurezza: Napoli