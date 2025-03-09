const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'secureconnectsecret';

router.post('/signup', async (req, res) => {
  console.log("Received Signup Request:", req.body);
  const { username, password, confirmPassword } = req.body;

  if (!username || !password || !confirmPassword) {
    console.log("Missing Fields Error");
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (password !== confirmPassword) {
    console.log("Password Mismatch Error");
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  if (password.length < 8 || !/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
    return res.status(400).json({ message: 'Password must include an uppercase letter and a special character' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {

      console.log("Username Already Exists");
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    console.log("User Registered Successfully");
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Sigup error:", err);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
