
document.getElementById("password").addEventListener("click", function() {
    const passwordField = document.getElementById("password");
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
});


document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('signup-form'); 
     
     
    const fullname = document.getElementById('full-name'); 
     
    const email = document.getElementById('email'); 
    const password = document.getElementById('password'); 
    const namefb = document.getElementById('namefb'); 
    const emailfb = document.getElementById('emailfb'); 
    
    const passfb = document.getElementById('passfb'); 
     
     
     
    fullname.addEventListener('input', () => { 
    if (fullname.value.length>=5) { 
        namefb.textContent = 'Valid Name!'; 
    namefb.className = 'valid'; 
    } else { 
     
    namefb.textContent = 'Please enter a valid Name.'; 
     
    namefb.className = 'error'; 
     
    } 
     
    }); 
     
     
     
    email.addEventListener('input', () => { 
    if (email.validity.valid) { 
    emailfb.textContent = 'Email is valid!'; 
    emailfb.className = 'valid'; 
    } else { 
     
    emailfb.textContent = ' Email is Invalid'; 
     
    emailfb.className = 'error'; 
     
    } 
     
    }); 
     
     
     
    password.addEventListener('input', () => { 
    if (password.value.length >= 14) { 
    passfb.textContent = 'Password looks good!'; 
    
    passfb.className = 'valid'; 
     
    } else { 
     
    passfb.textContent = 'Password must be at least 14 characters long.'; 
     
    passfb.className = 'error'; 
     
    } 
     
    }); 
     
     
     
    form.addEventListener('submit', (event) => { 
     
    if (!email.validity.valid || password.value.length < 8 || 
    username.value.length < 3) { 
     
    event.preventDefault(); 
     
    alert('Please fill out the form correctly before submitting.'); 
     
    } 
     
    }); 
     
   

    const role = login(username, password);
    
    if (role === "admin") {
        window.location.href = /admin/admin.html;
    } else if (role === "user") {
        window.location.href = /user/user.html;
    } else {
        alert("Invalid username or password");
    }
});

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

// Dummy user data
const users = {
  admin: { password: 'admin123', role: 'admin' },
  user: { password: 'user123', role: 'user' },
};

// Routes

// Home Route
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect(`/${req.session.user.role}`);
  } else {
    res.send(`
      <h2>Login</h2>
      <form method="POST" action="/login">
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    `);
  }
});

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (user && user.password === password) {
    req.session.user = { username, role: user.role };
    res.redirect(`/${user.role}`);
  } else {
    res.send(`
      <h3>Invalid username or password</h3>
      <a href="/">Try Again</a>
    `);
  }
});

// Admin Side
app.get('/admin', (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    res.send(`
      <h2>Welcome, Admin!</h2>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.redirect('/');
  }
});

// User Side
app.get('/user', (req, res) => {
  if (req.session.user && req.session.user.role === 'user') {
    res.send(`
      <h2>Welcome, User!</h2>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.redirect('/');
  }
});

// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
