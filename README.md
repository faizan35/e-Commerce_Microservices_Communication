# Microservices E-commerce

This project is designed as an example of an e-commerce application using **microservices architecture**. It consists of separate components for the backend, frontend, and a MongoDB database for storing product information.

<img src="./img/frontpage.png">

## Getting Started for Develpment

**To run the project locally, follow these steps:**

##### 1. Clone Repo

```bash
git clone https://github.com/faizan35/e-Commerce_Microservices_Communication.git
```

```bash
cd e-Commerce_Microservices_Communication/
```

##### 2. cd and install

```bash
bash ./scripts/npm_install.sh
```

##### 3. Create `.env` files

- Inside `/backend` dir.

  ```env
  MONGODB_URI=mongodb://127.0.0.1:27017/e-commerce
  PORT=3000
  HOST=0.0.0.0
  ```

- Inside `/frontend` dir.
  ```env
  PORT=8080
  ```

##### 4. Start (frontend, backend and database)

Open teminals, execute both command in both of them.

1. Run MongoDB Server.
2. Execute frontend first.

   ```bash
   node frontend/server.js
   ```

3. Execute backend then.

   ```bash
   node backend/backend.js
   ```

##### 5. Access the frontend in your browser at http://localhost:8080.

## Docker

### Build Docker Images

1. Frontend

```bash
cd frontend/
docker build -t faizan44/e-com_micro_frontend:latest .
```

2. Backend

```bash
cd backend/
docker build -t faizan44/e-com_micro_backend:latest .
```

### Push to DockerHub

- `docker push faizan44/e-com_micro_frontend`
- `docker push faizan44/e-com_micro_backend`

### Run with Docker-Compose

1. Install Docker-Compose

```bash
sudo apt  install docker-compose
```

2. Run

```bash
docker-compose up -d
```

3. down

```bash
docker-compose down
```

### Pull from DockerHUB and Run

1. Pull both images.

   ```bash
   docker pull faizan44/e-com_micro_frontend
   docker pull faizan44/e-com_micro_backend
   ```

2. Create `docker-compose.yml` file

- Just replace this,
  ```yaml
  build:
  context: ./frontend
  ```
- With

  ```yaml
  image: faizan44/e-com_micro_frontend
  ```

- Do same for **backend**, and run.

3. Run this command where your `docker-compose.yml` file is located.

```bash
docker-compose up -d
```

## K8s

- namespace: `kubectl create namespace e-com`
- `kubectl create namespace e-com`


- For checking DNS Resolutions is correct: `telnet mongodb-service 27017`

## API Endpoints

- **GET /api/products** Retrieve the list of products.
- **POST /api/products** Add a new product.
- **PUT /api/products/:id** Update an existing product.
- **DELETE /api/products/:id** Delete a product.

## Frontend Usage

- Click the "**Get Products**" button to fetch and display the list of products.
- Add, update, or delete products using the respective sections on the webpage.

## Database

The project uses MongoDB to store product data. Ensure you have MongoDB installed and running locally.

## Technologies Used

- Node.js
- Express.js
- CORS
- MongoDB
- Mongoose
- HTML, CSS, JS

## Contributing

Feel free to contribute to the project by submitting issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---
