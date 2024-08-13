const express = require('express');
const userModel = require('../models/userModel');
const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    userModel.register(username, password, (err) => {
        if (err) return res.status(500).send("Error registering user");
        res.status(200).send("User registered successfully");
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    userModel.findByUsername(username, (err, user) => {
        if (err || !user || user.password !== password) return res.status(401).send("Invalid credentials");
        res.status(200).json({ id: user.id, username: user.username, isAdmin: user.isAdmin, balance: user.balance });
    });
});

module.exports = router;
