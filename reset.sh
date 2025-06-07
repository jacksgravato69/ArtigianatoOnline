#!/bin/bash

echo "[INFO] Spegnimento dei container..."
docker compose down

echo "[INFO] Rimozione del vecchio database..."
rm -rf db-docker

echo "[INFO] Avvio e ricostruzione dei container..."
docker compose up --build