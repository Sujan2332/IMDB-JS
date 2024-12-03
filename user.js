// Function to get users from localStorage or initialize an empty array
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Function to save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function signUp() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const username = document.getElementById("username").value.trim();
    
    if(!username || !email || !password){
        alert("Invalid Data")
        // showMessage("Invalid data")
        return
    }

    const users = getUsers();

    // Check if email already exists
    const userExists = users.some(user => user.email === email);
    
    if (userExists) {
        alert('User already exists');
        return;
    }
    // Add new user
    users.push({ username, email, password });
    saveUsers(users);
    alert('Sign Up successful');
    
    // Clear the form
    document.getElementById('auth-form').reset();
}

function login() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if(!username || !email || !password){
        alert("Invalid data")
        return
    }

    const users = getUsers();
    
    // Check if user exists and password matches
    const user = users.find(user => user.username && user.email === email && user.password === password);
    
    if (user) {
        alert('Login successful');
        localStorage.setItem('loggedInUser', username);
        window.location.replace("./index.html")
        }
    
    // Clear the form
    document.getElementById('auth-form').reset();
}
