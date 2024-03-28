const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
export const BACKEND = process.env.BACKEND;

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Frontend service is running on http://localhost:${PORT}`);
});
