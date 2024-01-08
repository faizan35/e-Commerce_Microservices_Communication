// microservices-ecommerce/backend/backend.js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Sample product data
const products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
];

// CRUD operations
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  products.forEach((product, index) => {
    if (product.id === productId) {
      products[index] = updatedProduct;
    }
  });

  res.json(updatedProduct);
});

app.delete("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct[0]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend service is running on http://localhost:${PORT}`);
});
