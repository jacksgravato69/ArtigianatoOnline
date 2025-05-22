FROM node:22

WORKDIR /app
COPY . .

RUN npm install -g http-server

EXPOSE 8080
CMD ["http-server", ".", "-p", "8080"]