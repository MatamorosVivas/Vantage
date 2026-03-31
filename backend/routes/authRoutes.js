const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password_hash, role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already in use" });

        const salt = await bcrypt.genSalt(10);
        const scrambledPassword = await bcrypt.hash(password_hash, salt);

        const newUser = new User({
            first_name, last_name, email,
            password_hash: scrambledPassword,
            role: role || 'customer'
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created successfully!", userId: savedUser._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });


        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({ 
            token, 
            user: { id: user._id, first_name: user.first_name, role: user.role } 
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;