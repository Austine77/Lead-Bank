const express = require('express');
const userModel = require('../models/userModel');
const db = require('../database');
const router = express.Router();

// Update user balance (Admin only)
router.post('/update-balance', (req, res) => {
    const { userId, newBalance } = req.body;
    userModel.updateBalance(userId, newBalance, (err) => {
        if (err) return res.status(500).send("Error updating balance");
        res.status(200).send("Balance updated successfully");
    });
});

// Get all users
router.get('/users', (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) return res.status(500).send("Error retrieving users");
        res.status(200).json(users);
    });
});

// Admin chat with users
router.post('/send-message', (req, res) => {
    const { userId, message } = req.body;
    db.run("INSERT INTO messages (user_id, message, is_from_admin) VALUES (?, ?, ?)", [userId, message, true], (err) => {
        if (err) return res.status(500).send("Error sending message");
        res.status(200).send("Message sent successfully");
    });
});

router.get('/messages/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all("SELECT * FROM messages WHERE user_id = ?", [userId], (err, messages) => {
        if (err) return res.status(500).send("Error retrieving messages");
        res.status(200).json(messages);
    });
});

module.exports = router;
