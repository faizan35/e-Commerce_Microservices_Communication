const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");

const productSchema = new mongoose.Schema({
  name: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
