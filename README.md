# TypeSpeed - Typing Speed Project with User Authentication

A simple **typing speed test** built with JavaScript (frontend) and Node.js with SQLite (backend).  
Users can sign up, log in, and track their best words-per-minute (WPM) score.

---
![Webpage seen when loading.](/image/image.png "Webpage Image.")
---

## Features

**Typing Speed Test** - Measures words per minute (WPM)  
**User Authentication** - Sign up and log in with credentials  
**Best WPM Tracking** - Saves the highest WPM per user  
**Fully Functional API** - Built with Node.js, Express, and SQLite

---

## Project Structure

```
TypeSpeed/
│── public/          # Frontend files (HTML, CSS, JS)
│   ├── index.html   # Main UI
│   ├── styles.css   # Styling
│   ├── script.js    # Typing test script logic
│   ├── auth.js      # Handles login & signup of users
│── server.js        # Backend server (Express, SQLite)
│── database.js      # SQLite database setup
│── users.db         # Database file
│── package.json     # Node.js dependencies
│── README.md        # Project documentation (This document!)
```

---

## Getting Started

Make sure you have **Node.js** installed, then run:

```bash
npm install
```

### Start the Backend Server

Run the **Node.js server**:

```bash
node server.js
```

The server will start on **http://localhost:5001/**.

### Open the Frontend

Simply open **`public/index.html`** in your browser **OR** visit:

```
http://localhost:5001/
```

---

## API Endpoints

| Method | Endpoint         | Description                  |
|--------|-----------------|------------------------------|
| POST   | `/signup`       | Creates a new user          |
| POST   | `/login`        | Logs in a user              |
| POST   | `/update-wpm`   | Updates best WPM for a user |

### Example: Sign Up a User

```bash
curl -X POST http://localhost:5001/signup -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'
```

**OR**, you can just use the sign up and login buttons!

## Notes

- The **database (`users.db`) stores user info and best WPM**.  
- If you restart the server, existing users and scores **remain saved**.  
- To reset the database, delete `users.db` and restart the server.

---

## Author

**James Robinett**  