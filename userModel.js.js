const db = require('../database');

module.exports = {
    register: (username, password, callback) => {
        db.run("INSERT INTO users (username, password, balance, isAdmin) VALUES (?, ?, ?, ?)", [username, password, 0, false], callback);
    },
    findByUsername: (username, callback) => {
        db.get("SELECT * FROM users WHERE username = ?", [username], callback);
    },
    updateBalance: (userId, balance, callback) => {
        db.run("UPDATE users SET balance = ? WHERE id = ?", [balance, userId], callback);
    },
    getAllUsers: (callback) => {
        db.all("SELECT * FROM users WHERE isAdmin = ?", [false], callback);
    }
};
