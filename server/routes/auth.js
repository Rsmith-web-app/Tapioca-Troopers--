const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');

// Serve login page
router.get('/login', (req, res) => {
  res.render('login', { message: null });
});

// Handle login logic
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let userCheck = await userModel.findOne({ email });
    if (userCheck) {
      // sign jwt and sends http-only 
    }


  } catch (error) {

  }
});

// Serve register page
router.get('/register', (req, res) => {
  res.render('register', { message: null });
});

// Handle registration logic
router.post("/auth/register", async (req, res) => {
  let { username, email, password } = req.body;


  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (username === await userModel.findOne({ username }) || username.length <= 0); {
      this.username = "User" + Math.floor(Math.random()).toString();
    }
    const newUser = new userModel({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: `Registration Failed: ${error.message}` });
  }
});


module.exports = router;
