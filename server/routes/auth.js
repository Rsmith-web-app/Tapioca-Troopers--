const express = require('express');
const userModel = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "Secret";

// Handle login logic
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received for email:", email);

  try {
    // Check if user exists by email
    const userCheck = await userModel.findOne({ email });
    if (!userCheck) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("Hashed password from DB:", userCheck.password);

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, userCheck.password);
    console.log("Password comparison result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Password mismatch");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: userCheck._id, username: userCheck.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ username: userCheck.username, token });
  } catch (error) {
    console.error(`Login failed: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle registration logic
router.post("/auth/register", async (req, res) => {
  let { name: username, email, password } = req.body;

  console.log("Registration request received for email:", email);

  try {
    // Validate input
    if (!username || typeof username !== "string" || username.trim().length < 3) {
      return res.status(400).json({
        message: "Invalid username provided. Username must be a string with at least 3 characters.",
      });
    }

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Invalid email provided" });
    }

    if (!password || typeof password !== "string" || password.trim().length < 6) {
      return res.status(400).json({
        message: "Invalid password provided. Password must be at least 6 characters long.",
      });
    }

    // Check if user already exists by email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      console.log("Attempt to register with duplicate email:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Check for duplicate username and generate a new one if necessary
    const duplicateUsername = await userModel.findOne({ username });
    if (duplicateUsername) {
      username = `User${Math.floor(Math.random() * 10000)}`;
      console.log(`Duplicate username detected. Generated new username: ${username}`);
    }



    // Create and save the new user
    const newUser = new userModel({ username, email, password });
    await newUser.save();

    console.log("Original password:", password);




    return res.status(201).json({
      message: "User registered successfully",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error(`Registration failed: ${error.message}`);
    return res.status(500).json({ message: `Registration Failed: ${error.message}` });
  }
});

module.exports = router;
