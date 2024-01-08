#!/bin/bash

# assuming docker is installed

# TAG=latest
# $TAG

# backend
cd backend/
sudo docker build -t faizan44/e_com-backend:latest . || { echo "Error building product-service"; exit 1; }
cd ..

# database
cd database/
sudo docker build -t faizan44/e_com-database:latest . || { echo "Error building user-service"; exit 1; }
cd ..

# frontend
cd frontend/
sudo docker build -t faizan44/e_com-frontend:latest . || { echo "Error building order-service"; exit 1; }
cd ..



# give mggs..
echo "---------- Img Build Done --------"