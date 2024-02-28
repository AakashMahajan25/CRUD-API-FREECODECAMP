const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const Product = require("./models/product.model.js");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const createdProduct = await Product.create(req.body);
    res.status(200).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Product
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not Found" });
    }
    res.status(200).json({ message: "Product Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
