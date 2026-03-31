const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/my-orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', verifyAdmin, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;