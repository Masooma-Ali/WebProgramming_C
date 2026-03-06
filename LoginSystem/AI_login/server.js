const express = require('express');
const session = require('express-session');
const connectDB = require('./Db');
const User = require('./User');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware: parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Secure session middleware
app.use(session({
  secret: 'myVerySecretKey!@#2024',  // In real apps, store this in .env file
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,  // 1 hour
    httpOnly: true,           // SECURITY: prevents JS from reading cookie
    sameSite: 'strict',       // SECURITY: prevents cross-site attacks (CSRF)
  },
}));

// ─── Input Validation Helper ──────────────────────────────────────────────────
function validateInput(username, password) {
  if (!username || !password) {
    return 'Username and password are required';
  }
  if (username.length < 3 || username.length > 20) {
    return 'Username must be between 3 and 20 characters';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null; // null means no error
}

// ─── Authentication Middleware ────────────────────────────────────────────────
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please login first.' });
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// POST /register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  const error = validateInput(username, password);
  if (error) return res.status(400).json({ message: error });

  try {
    const user = new User(username, password);
    const message = await user.register();
    res.status(201).json({ message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  const error = validateInput(username, password);
  if (error) return res.status(400).json({ message: error });

  try {
    const user = new User(username, password);
    const message = await user.login();

    // Create session after successful login
    req.session.user = username;

    res.json({ message });
  } catch (err) {
    // SECURITY: always give same error for wrong username OR password
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// GET /dashboard — Protected route
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.json({ message: `Welcome ${req.session.user}` });
});

// GET /logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid'); // SECURITY: remove cookie from browser
    res.json({ message: 'Logout successful' });
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});