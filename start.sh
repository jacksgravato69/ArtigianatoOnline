#!/bin/bash
echo "Chiudo eventuali container..."
docker compose down
echo "Avvio della web app..."
docker compose up --build