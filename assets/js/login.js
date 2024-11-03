document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const usernameGroup = document.getElementById("username-group");
    const createAccountButton = document.getElementById("create-account");
    const loginButton = document.getElementById("login-button");
    const loginPrompt = document.getElementById("loginPrompt"); // Select the login prompt text
    let mockUsers = [];
    let isCreatingAccount = false;

    // Fetch users from JSON file
    fetch("assets/json/users.json")
        .then(response => response.json())
        .then(users => {
            mockUsers = users;
        })
        .catch(error => {
            console.error("Error loading user data:", error);
        });

    // Toggle between Create Account and Login modes
    createAccountButton.addEventListener("click", () => {
        isCreatingAccount = !isCreatingAccount; // Toggle the mode

        if (isCreatingAccount) {
            // Switch to Create Account mode
            usernameGroup.style.display = "block"; // Show username field
            loginButton.textContent = "Create Account"; // Change submit button text
            createAccountButton.textContent = "Back to Login"; // Change to "Back to Login"
            loginPrompt.style.display = "none"; // Hide the login prompt text
        } else {
            // Switch back to Login mode
            usernameGroup.style.display = "none"; // Hide username field
            loginButton.textContent = "Log in"; // Change submit button text back to "Log in"
            createAccountButton.textContent = "Create an Account"; // Change to "Create an Account"
            loginPrompt.style.display = "block"; // Show the login prompt text
        }
    });

    // Handle form submission
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;
        const username = document.getElementById("username").value;

        if (isCreatingAccount) {
            createAccount(username, email, password);
        } else {
            loginUser(email, password);
        }
    });

    function createAccount(username, email, password) {
        // Check if email already exists
        const existingUser = mockUsers.find(user => user.email === email);
        if (existingUser) {
            alert("An account with this email already exists.");
            return;
        }

        // Add the new user to the mockUsers array
        mockUsers.push({ username, email, password });
        console.log("Account created:", { username, email });

        alert("Account created successfully! You can now log in.");
        isCreatingAccount = false; // Reset to login mode

        // Reset form to Login mode
        usernameGroup.style.display = "none";
        loginButton.textContent = "Log in";
        createAccountButton.textContent = "Create an Account";
        loginPrompt.style.display = "block"; // Show the login prompt text
        loginForm.reset();
    }

    function loginUser(email, password) {
        const user = mockUsers.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login successful!");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", email);
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    }
});
