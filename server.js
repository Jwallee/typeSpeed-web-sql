const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./database");

const app = express(); // Express application
app.use(cors()); // Front-end to back end communication
app.use(bodyParser.json());

// Serving public files
app.use(express.static(path.join(__dirname, "public")));

// Route to signup
app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    // Encrypts password for security
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Adding valid username and password to DB
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", 
        [username, hashedPassword], 
        (err) => {
            if (err) {
                return res.status(400).json({ error: "Username already taken" });
            }
            res.json({ message: "User registered successfully" });
        }
    );
});

// Route to login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Checking the database for registered user
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Check for correct password
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        // Success message!
        res.json({ message: "Login successful", username: user.username, best_wpm: user.best_wpm });
    });
});

// Updating WPM high-score
app.post("/update-wpm", (req, res) => {
    const { username, newWPM } = req.body;

    // First, have to get the current best WPM from the database
    db.get("SELECT best_wpm FROM users WHERE username = ?", [username], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(400).json({ error: "User not found" });
        }

        let currentBestWPM = row.best_wpm || 0;

        // If the new WPM is higher, update the database
        if (newWPM > currentBestWPM) {
            db.run("UPDATE users SET best_wpm = ? WHERE username = ?", [newWPM, username], function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: "Best WPM updated successfully", best_wpm: newWPM });
            });
        } else {
            res.json({ message: "No update needed", best_wpm: currentBestWPM });
        }
    });
});

// Serves front page (index.html) for all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
