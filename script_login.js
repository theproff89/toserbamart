// script_login.js

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();
        
        // Sample validation (replace with actual validation logic)
        if (username === "user" && password === "password") {
            alert("Login successful!");
            // Redirect to home page or dashboard
            window.location.href = "index_home.html";
        } else {
            errorMsg.textContent = "Invalid username or password.";
            errorMsg.style.color = "red";
        }
    });
});
