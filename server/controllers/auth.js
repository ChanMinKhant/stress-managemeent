const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const CustomError = require('../utils/CustomError');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');

// Utility function to normalize email by removing dots before '@'


exports.register = asyncHandler(async (req, res, next) => {
  const user = new User(req.body);

  // save the user to the database
  await user.save();
  res.status(201).send({
    success: true,
    message: 'User registered successfully',
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // Assuming bcrypt is used for password hashing
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send({
      success: false,
      message: 'Invalid email or password',
    });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  });

  res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 10 * 24 * 60 * 60 * 1000 }); // 10 days
  res.status(200).send({
    success: true,
    message: 'Login successful',
    token,
  });

  res.status(200).send({
    success: true,
    message: 'Login endpoint is not implemented yet',
  });
  
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', { path: '/', maxAge: 1 });
  res.status(200).send({
    success: true,
    message: 'Logged out successfully',
  });
});
