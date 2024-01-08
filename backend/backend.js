const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const mongoose = require("mongoose");
const Product = require("../database/database");

app.use(express.json());
app.use(cors());

// Function to check if products exist in the database
const checkAndInsertDemoData = async () => {
  try {
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      // Insert demo data if no products exist
      const demoProducts = [
        { name: "Product 1" },
        { name: "Product 2" },
        { name: "Product 3" },
      ];

      await Product.insertMany(demoProducts);
      console.log("Demo data inserted successfully.");
    }
  } catch (error) {
    console.error("Error checking or inserting demo data:", error.message);
  }
};

// CRUD operations
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name: req.body.name },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    res.json(deletedProduct);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce")
  .then(async () => {
    console.log("Connected to the database");
    await checkAndInsertDemoData(); // Check and insert demo data
    app.listen(PORT, () => {
      console.log(`Backend service is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Error connecting to the database:", error));
