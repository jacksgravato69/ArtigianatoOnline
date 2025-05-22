#Immagine di node da usare
FROM node:22 

#Directory di dove verrà salvato questo container
WORKDIR /app

#Copio i 2 file json e eseguo il programma npm install per installare tutti i pacchetti
COPY package*.json ./
RUN npm install

#Copio tutto il contenuto della cartella backend in /app
COPY . .

#Apro la porta 3000 (La stessa su dove ascolta la webapp) ed eseguo il comando per eseguire il server
EXPOSE 3000
CMD ["npm", "start"]