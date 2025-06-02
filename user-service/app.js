// user-service/app.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let users = [];

// Home page
app.get('/', (req, res) => {
  res.render('home');
});

// Render registration form
app.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send('Missing required fields');
  }
  const userExists = users.find(u => u.email === email);
  if (userExists) return res.status(409).send('User already exists');
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);
  res.send('User registered successfully');
});

// Render login form
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).send('Invalid credentials');
  res.send('Login successful!');
});

app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});
