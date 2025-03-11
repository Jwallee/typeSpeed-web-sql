const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database (or create it if it doesn’t exist)
const db = new sqlite3.Database("./users.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

// Create a users table if it doesn't exist
// Saves username, password and best WPM
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            best_wpm INTEGER DEFAULT 0
        )
    `);
});

module.exports = db;