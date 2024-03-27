const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const productSchema = new mongoose.Schema({
  name: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
