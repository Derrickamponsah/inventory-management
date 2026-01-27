const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// CREATE product
router.post("/", async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    if (!name || quantity == null || price == null) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const product = new Product({ name, quantity, price });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error adding product" });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, quantity, price },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

module.exports = router;
