const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const Product = require("./models/product.model.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {
    console.log("Connected to Database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });

    app.post("/api/products", async (req, res) => {
      try {
        const Product = await Product.create(req.body);
        res.status(200).json(Product);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
