function openSignup() {
  console.log("akdfalsdkjf");
  window.location.href = "signup.html";
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  clientLogin();
});

async function clientLogin() {
    alert("client is Logging in");

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    alert("username " +  username + " - password " + password);

    await login(username, password);
}

async function login(username, password) {
  try {

    alert("trying to fetch");

    const text = await response.text();
    console.log(text, JSON.stringify({ username, password }));

    // Fetch from login endpoint
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    // await results
    const result = await response.json();

    if (result.success) {
      alert('Login successful! Redirecting...', 'success');
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        alert("changing page to dashboard")
      }, 1000);
      
      return true;
    } 
    else {
      alert(result.error || 'Login failed', 'error');
      return false;
    }
  }
  catch (error) {
    console.error('Login error:', error);
    alert('Network error', 'error');
    return false;
  }
}