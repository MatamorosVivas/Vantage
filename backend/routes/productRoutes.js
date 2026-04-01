const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyAdmin } = require('../middleware/authMiddleware');

// 1. GET ALL PRODUCTS (Public)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// 2. GET SINGLE PRODUCT (Public)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Not found" });
        res.status(200).json(product);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// 3. CREATE PRODUCT (Admin Only)
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) { res.status(400).json({ error: error.message }); }
});

// 4. UPDATE PRODUCT (Admin Only)
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) { res.status(400).json({ error: error.message }); }
});

// 5. DELETE PRODUCT (Admin Only)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) { res.status(400).json({ error: error.message }); }
});

module.exports = router;