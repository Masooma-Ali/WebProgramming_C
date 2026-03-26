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

// Session middleware
app.use(session({
  secret: 'mySecretKey123',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
}));

// ─── Authentication Middleware ────────────────────────────────────────────────
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please login first.' });
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// POST /register — Register a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = new User(username, password);
    const message = await user.register();
    res.status(201).json({ message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /login — Login and create session
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = new User(username, password);
    const message = await user.login();

    // Create session
    req.session.user = username;

    res.json({ message });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

// GET /dashboard — Protected route (requires login)
app.get('/dashboard', isAuthenticated, (req, res) => {
  res.json({ message: `Welcome ${req.session.user}` });
});

// GET /logout — Destroy session
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
