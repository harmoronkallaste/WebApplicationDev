document.addEventListener("DOMContentLoaded", () => {
    const profileImage = document.getElementById("profilePicture");
    const dropdownMenu = document.getElementById("dropdownMenu");

    profileImage.addEventListener("click", () => {
        if (dropdownMenu.style.display === "block") {
            dropdownMenu.style.display = "none";
        } else {
            dropdownMenu.style.display = "block";
        }
    });
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const usernameGroup = document.getElementById("username-group");
    const createAccountButton = document.getElementById("create-account");
    const loginButton = document.getElementById("login-button");
    const loginPrompt = document.getElementById("loginPrompt");
    let mockUsers = [];
    let isCreatingAccount = false;

    const secretKey = '$2a$10$N715LPdCc891J66nlkF4Kej6Jt3XhNTHfsl/8F7J2VE6XG8BopbeK';
    const binID = '672a363ae41b4d34e44ee9f0';

    fetch(`https://api.jsonbin.io/v3/b/${binID}`, {
        method: "GET",
        headers: {
            "X-Master-Key": secretKey,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("Fetched data:", data);
        mockUsers = data.record;
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });

    createAccountButton.addEventListener("click", () => {
        isCreatingAccount = !isCreatingAccount;

        if (isCreatingAccount) {
            usernameGroup.style.display = "block"; 
            loginButton.textContent = "Create Account"; 
            createAccountButton.textContent = "Back to Login"; 
            loginPrompt.style.display = "none"; 
        } else {
            usernameGroup.style.display = "none"; 
            loginButton.textContent = "Log in"; 
            createAccountButton.textContent = "Create an Account"; 
            loginPrompt.style.display = "block"; 
        }
    });

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
        const existingUser = mockUsers.find(user => user.email === email);
        if (existingUser) {
            alert("An account with this email already exists.");
            return;
        }

        mockUsers.push({ username, email, password });
        console.log("Account created:", { username, email });

        alert("Account created successfully! You can now log in.");
        isCreatingAccount = false;

        usernameGroup.style.display = "none";
        loginButton.textContent = "Log in";
        createAccountButton.textContent = "Create an Account";
        loginPrompt.style.display = "block";
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

// Vue

const app = Vue.createApp({
    data() {
        return {
            password: "",
            passwordErrors: [],
            touched: false
        };
    },
    watch: {
        password(newPassword) {
            this.validatePassword(newPassword);
        }
    },
    methods: {
        validatePassword(password) {
            this.passwordErrors = [];

            const lengthCheck = password.length >= 8 && password.length < 15;
            const uppercaseCheck = /[A-Z]/.test(password);

            let lowercaseCount = 0;
            for (let char of password) {
                if (char >= 'a' && char <= 'z') {
                    lowercaseCount++;
                }
                if (lowercaseCount >= 2) break;
            }

            const lowercaseCheck = lowercaseCount >= 2;

        const numericCheck = /\d/.test(password);
        const startsWithUppercase = /^[A-Z]/.test(password);
        const underscoreCheck = password.includes("_");

        if (!lengthCheck) this.passwordErrors.push("Password must be 8-14 characters long.");
        if (!uppercaseCheck) this.passwordErrors.push("Password must include at least one uppercase letter.");
        if (!lowercaseCheck) this.passwordErrors.push("Password must include at least two lowercase letters.");
        if (!numericCheck) this.passwordErrors.push("Password must include at least one numeric value.");
        if (!startsWithUppercase) this.passwordErrors.push("Password must start with an uppercase letter.");
        if (!underscoreCheck) this.passwordErrors.push("Password must include the character '_'.");
        },
        handleFocus() {
            this.touched = true;
        },
        handleBlur() {
            this.touched = false;
        }
    }
});

app.mount("#app");
