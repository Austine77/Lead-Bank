const express = require('express');
const db = require('../database');
const router = express.Router();

// Get user balance
router.get('/balance/:id', (req, res) => {
    const userId = req.params.id;
    db.get("SELECT balance FROM users WHERE id = ?", [userId], (err, row) => {
        if (err) return res.status(500).send("Error fetching balance");
        res.status(200).json({ balance: row.balance });
    });
});

// Deposit money (mocked, no actual transaction)
router.post('/deposit', (req, res) => {
    const { userId, amount } = req.body;
    db.run("UPDATE users SET balance = balance + ? WHERE id = ?", [amount, userId], (err) => {
        if (err) return res.status(500).send("Error depositing money");
        res.status(200).send("Deposit successful");
    });
});

// Get messages for a user
router.get('/messages/:userId', (req, res) => {
    const userId = req.params.userId;
    db.all("SELECT * FROM messages WHERE user_id = ?", [userId], (err, messages) => {
        if (err) return res.status(500).send("Error retrieving messages");
        res.status(200).json(messages);
    });
});

// Send message to admin
router.post('/send-message', (req, res) => {
    const { userId, message } = req.body;
    db.run("INSERT INTO messages (user_id, message, is_from_admin) VALUES (?, ?, ?)", [userId, message, false], (err) => {
        if (err) return res.status(500).send("Error sending message");
        res.status(200).send("Message sent successfully");
    });
});

module.exports = router;
