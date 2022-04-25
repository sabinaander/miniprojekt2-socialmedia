const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Role = require('../models/roleModel');
const uuid = require('uuid');
// const cookieSession = require('cookie-session')
require('dotenv').config();

// @desc Register new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    res.send({ message: 'Please fill in all fields' });
    return;
  }

  // Check if user exist
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    res.send({ message: 'User already exists.' });
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    res.send({ message: 'Invalid user data' });
    return;
  }

  // all correct
  req.session.id = uuid.v4();
  req.session.username = user.username;
  req.session.loginDate = new Date();
  req.session.role = undefined; // User could have a role (access privileges)

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (req.session.id) {
    res.status(400);
    return res.send({ message: 'Already logged in' });
  }

  // Check for user email
  const user = await User.findOne({ email: email }).exec();

  console.log(user);
  // checks to see if user exists
  if (!user) {
    res.status(400);
    res.send({ message: 'Incorrect login details' });
    return;
  }
  // checks password
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    res.send({ message: 'Incorrect login details' });
    return;
  }

  // all correct
  req.session.id = uuid.v4();
  req.session.username = user.username;
  req.session.loginDate = new Date();
  req.session.role = undefined; // User could have a role (access privileges)

  res.send({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.session.id) {
    return res
      .status(400)
      .send({ message: 'Cannot logout when you are not logged in' });
  }
  req.session = null;
  res.send({ message: 'Your are now logged out' });
});

// Get user by id
const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    res.send({ message: 'This user does not exist.' });
    return;
  }

  res.json(user);
});

// delete user by id
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    res.send({ message: 'This user does not exist.' });
    return;
  }

  await User.findByIdAndDelete(id);
  res.send({ message: 'user has been deleted.' });
});

// Get all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate('role');

  if (!users) {
    res.send({ message: 'No users can be found.' });
    return;
  }

  res.json(users);
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  deleteUser,
  logoutUser,
};
