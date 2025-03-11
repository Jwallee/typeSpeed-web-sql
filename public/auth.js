const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const welcomeMsg = document.getElementById("welcome-msg");

let currentUser = null;

// Checking local session for login status
async function checkUser() {
    let storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
        currentUser = storedUser;
        let response = await fetch("http://localhost:5001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: storedUser, password: "dummy" }) // Dummy password just to get best WPM
        });

        let data = await response.json();
        if (data.best_wpm !== undefined) {
            welcomeMsg.innerText = `Welcome, ${currentUser}! Best WPM: ${data.best_wpm}`;
            loginBtn.style.display = "none";
            signupBtn.style.display = "none";
            logoutBtn.style.display = "block";
        }
    }
}

// Function to SignUp
signupBtn.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
        alert("Please Enter a Valid Username and Password.")
    } else {
        const response = await fetch("http://localhost:5001/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
    
        const data = await response.json();
        alert(data.message);
    }
});

// Login Function
loginBtn.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.error) {
        alert(data.error);
    } else {
        currentUser = username;
        localStorage.setItem("loggedInUser", username);
        welcomeMsg.innerText = `Welcome, ${username}! Best WPM: ${data.best_wpm}`;
        loginBtn.style.display = "none";
        signupBtn.style.display = "none";
        logoutBtn.style.display = "block";
    }
});

// Logout Function
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    location.reload();
});

// Call checkUser() on page load
checkUser();
