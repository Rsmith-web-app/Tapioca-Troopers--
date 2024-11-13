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


module.exports = router;
