const express = require('express');
const router = express.Router();

// Serve login page
router.get('/login', (req, res) => {
  res.render('login', { message: null });
});

// Handle login logic
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  res.render('login', { message: 'Invalid email or password.' });
});

// Serve register page
router.get('/register', (req, res) => {
  res.render('register', { message: null });
});

// Handle registration logic
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Simulate registration validation
  if (!username || !email || !password) {
    return res.render('register', { message: 'All fields are required.' });
  }

  console.log('User registered:', { username, email });
  res.redirect('/api/auth/login');
});

module.exports = router;
