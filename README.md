# Microservices E-commerce

Welcome to the Microservices E-commerce project!

## Introduction

This project is designed as an example of an e-commerce application using microservices architecture. It consists of separate components for the backend, frontend, and a MongoDB database for storing product information.

<img src="./img/frontpage.png">

## Getting Started

To run the project locally, follow these steps:

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start the Backend:**

   ```bash
   node backend/backend.js
   ```

3. **Start the Frontend:**

   ```bash
   node frontend/server.js
   ```

4. Access the frontend in your browser at http://localhost:8080.

## API Endpoints

- **GET /api/products** Retrieve the list of products.
- **POST /api/products** Add a new product.
- **PUT /api/products/:id** Update an existing product.
- **DELETE /api/products/:id** Delete a product.

## Frontend Usage

- Click the "Get Products" button to fetch and display the list of products.
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
