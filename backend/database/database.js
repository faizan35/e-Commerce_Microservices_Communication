const mongoose = require("mongoose");

mongoose.connect("mongodb://database:27017/e-commerce");

const productSchema = new mongoose.Schema({
  name: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
