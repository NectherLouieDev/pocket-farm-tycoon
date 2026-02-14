// Show Signup Form
function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.querySelector(".forgot").style.display = "none";
    document.querySelector(".new-user").style.display = "none";
    document.querySelector(".signup-btn").style.display = "none";

    document.getElementById("signupForm").style.display = "block";
}

// Handle Sign Up
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    if (username === "" || password === "") {
        alert("Please fill all fields!");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Account Created Successfully!");

    // Go back to login
    location.reload();
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        alert("Login Successful!");
    } else {
        alert("Invalid Username or Password");
    }
});

// Forgot Password
function forgotPassword() {
    const username = prompt("Enter your username:");

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername) {
        alert("Your password is: " + storedPassword);
    } else {
        alert("Username not found!");
    }
}
