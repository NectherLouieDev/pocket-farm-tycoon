// User database
let usersDatabase = [];

// Base path for JSON files
const JSON_BASE_PATH = "/src/data/";

// Load users from external JSON file
async function loadUsersFromFile() {
  try {
    // Always fetch fresh data from users.json first
    try {
      const response = await fetch(`${JSON_BASE_PATH}users.json`);
      if (response.ok) {
        usersDatabase = await response.json();
        // Save to localStorage as backup/cache
        localStorage.setItem("usersDatabase", JSON.stringify(usersDatabase));
        console.log("Loaded users from users.json:", usersDatabase.length);
      } else {
        // If users.json doesn't exist, try localStorage as fallback
        const storedUsers = localStorage.getItem("usersDatabase");
        if (storedUsers) {
          usersDatabase = JSON.parse(storedUsers);
          console.log(
            "Loaded users from localStorage (fallback):",
            usersDatabase.length,
          );
          // Try to create users.json with existing data
          await saveUsersToFile();
        } else {
          console.warn("users.json not found, starting with empty database");
          usersDatabase = [];
          // Initialize empty users.json
          await saveUsersToFile();
        }
      }
    } catch (fetchError) {
      console.log("Error fetching users.json, trying localStorage...");
      // Try localStorage as fallback
      const storedUsers = localStorage.getItem("usersDatabase");
      if (storedUsers) {
        usersDatabase = JSON.parse(storedUsers);
        console.log(
          "Loaded users from localStorage (fallback):",
          usersDatabase.length,
        );
        // Try to restore users.json from localStorage
        await saveUsersToFile();
      } else {
        console.log("No users found, starting with empty database");
        usersDatabase = [];
        // Initialize empty users.json
        await saveUsersToFile();
      }
    }
  } catch (error) {
    console.error("Error loading users:", error);
    usersDatabase = [];
  }
}

// Save users to JSON file (server-side via API endpoint)
async function saveUsersToFile() {
  try {
    // Method 1: Using fetch API to a server endpoint (if you have a backend)
    const response = await fetch("/api/save-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usersDatabase),
    });

    if (response.ok) {
      console.log("Users saved to users.json successfully");
    } else {
      console.warn(
        "Could not save to users.json directly, using localStorage only",
      );
      // Fallback to localStorage
      saveUsersToStorage();
    }
  } catch (error) {
    console.warn("Error saving to users.json, using localStorage only:", error);
    // Fallback to localStorage
    saveUsersToStorage();
  }

  // Always save to localStorage as backup
  saveUsersToStorage();
}

// Save users to localStorage only
function saveUsersToStorage() {
  localStorage.setItem("usersDatabase", JSON.stringify(usersDatabase));
  console.log(
    "Users saved to localStorage. Current users:",
    usersDatabase.length,
  );

  // For debugging - show the current database
  console.log("Current users database:", usersDatabase);
}

// Show Signup Form
function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.querySelector(".forgot").style.display = "none";
  document.querySelector(".new-user").style.display = "none";
  document.querySelector(".signup-btn").style.display = "none";
  document.getElementById("formTitle").textContent = "Sign Up";
  document.getElementById("signupForm").style.display = "block";
}

// Show Login Form
function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
  document.querySelector(".forgot").style.display = "block";
  document.querySelector(".new-user").style.display = "block";
  document.querySelector(".signup-btn").style.display = "block";
  document.getElementById("formTitle").textContent = "Login";
}

// Handle Sign Up
document
  .getElementById("signupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const fullname = document.getElementById("signupFullname").value.trim();
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById(
      "signupConfirmPassword",
    ).value;

    // Validation
    if (fullname === "" || username === "" || email === "" || password === "") {
      alert("Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Load current users
    await loadUsersFromFile();

    // Check if username already exists
    const usernameExists = usersDatabase.some(
      (user) => user.username === username,
    );
    if (usernameExists) {
      alert("Username already exists! Please choose another.");
      return;
    }

    // Check if email already exists
    const emailExists = usersDatabase.some((user) => user.email === email);
    if (emailExists) {
      alert("Email already registered! Please use another email or login.");
      return;
    }

    // Create new user object
    const newUser = {
      id: Date.now(),
      fullname: fullname,
      username: username,
      email: email,
      password: password,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

    // Add to database
    usersDatabase.push(newUser);

    // Save to both users.json and localStorage
    await saveUsersToFile();

    alert("Account Created Successfully! You can now login.");

    // Clear form
    document.getElementById("signupForm").reset();

    // Go back to login
    showLogin();
  });

// Handle Login
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const loginInput = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (loginInput === "" || password === "") {
      alert("Please fill all fields!");
      return;
    }

    // Load current users
    await loadUsersFromFile();

    // Check if input is email or username and find user
    const user = usersDatabase.find(
      (user) =>
        (user.username === loginInput || user.email === loginInput) &&
        user.password === password,
    );

    if (user) {
      alert(`Login Successful! Welcome back, ${user.fullname}!`);

      // Update last login time
      user.lastLogin = new Date().toISOString();
      await saveUsersToFile(); // Save updated lastLogin to users.json

      // Store current user session
      sessionStorage.setItem("authenticated", "true");
      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem("username", user.username);
      sessionStorage.setItem("userFullname", user.fullname);
      sessionStorage.setItem("userEmail", user.email);

      localStorage.setItem("lastLogin", new Date().toISOString());
      localStorage.setItem("lastUser", user.username);

      // Redirect to dashboard (make sure this path exists)
      window.location.href = "../dashboard/index.html";
    } else {
      alert("Invalid Username/Email or Password");
    }
  });

// Forgot Password
async function forgotPassword() {
  const loginInput = prompt("Enter your username or email:");

  if (!loginInput) return;

  await loadUsersFromFile();

  const user = usersDatabase.find(
    (user) => user.username === loginInput || user.email === loginInput,
  );

  if (user) {
    alert(
      `Your password is: ${user.password}\n\nFor security, please change your password after logging in.`,
    );
  } else {
    alert("User not found!");
  }
}

// View all users (for debugging)
async function viewAllUsers() {
  await loadUsersFromFile();
  console.log("Users Database:", usersDatabase);

  if (usersDatabase.length === 0) {
    alert("No users registered yet!");
  } else {
    let userList = "Registered Users:\n";
    usersDatabase.forEach((user, index) => {
      userList += `${index + 1}. ${user.fullname} (${user.username}) - ${user.email}\n`;
    });
    alert(userList);
  }
}

// Export users to JSON file (manual trigger)
function exportUsersToJson() {
  const dataStr = JSON.stringify(usersDatabase, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "users.json";
  downloadLink.click();

  URL.revokeObjectURL(url);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", async function () {
  await loadUsersFromFile();

  // Double-click to view users
  document
    .getElementById("formTitle")
    .addEventListener("dblclick", function () {
      viewAllUsers();
    });

  // Triple-click to export users (optional)
  let clickCount = 0;
  document.getElementById("formTitle").addEventListener("click", function () {
    clickCount++;
    if (clickCount === 3) {
      exportUsersToJson();
      clickCount = 0;
    }
    setTimeout(() => (clickCount = 0), 500);
  });

  console.log("Login system initialized");
});
