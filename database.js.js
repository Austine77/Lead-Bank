const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    // Create a users table
    db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, balance REAL, isAdmin BOOLEAN)");
    db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY, user_id INTEGER, message TEXT, is_from_admin BOOLEAN)");
});

module.exports = db;
