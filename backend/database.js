const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const productSchema = new mongoose.Schema({
  name: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
