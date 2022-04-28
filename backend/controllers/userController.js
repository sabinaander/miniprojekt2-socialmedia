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

  // Get default role
  const userRole = (await Role.find({ name: 'user' })).pop();

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: userRole,
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
  req.session.role = userRole;

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role.name,
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
  const user = await User.findOne({ email: email }).populate('role').exec();

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
  req.session.role = user.role;

  res.send({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role.name,
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

// Get user by username
const getUser = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username }).exec();

  if (!user) {
    res.status(400);
    res.send({ message: 'This user does not exist.' });
    return;
  }
  user.password = '';

  res.json(user);
});

// Get current logged in user
const getCurrentUser = asyncHandler(async (req, res) => {
  const username = req.session.username;
  if (!username) {
    res.status(403);
    res.send({ message: 'You are not currently logged in.' });
    return;
  }

  // Should only happen if the logged in user has been removed
  const user = await User.findOne({ username }).populate('role').exec();
  if (!user) {
    res.status(403);
    res.send({ message: 'Could not find the currently logged on user.' });
    return;
  }

  const response = {
    username: user.username,
    email: user.email,
    role: user.role.name,
  };

  res.json(response);
});

// delete user by username
const deleteUser = asyncHandler(async (req, res) => {
  // checks to see if cookie session id is existing
  if (!req.session.id) {
    res.status(401);
    res.send({ message: 'Unauthorized save attempt.' });
    return;
  }

  //(now checks so the cookie name and localstorage name is same)
  if (
    req.session.role.name !== 'admin' &&
    req.session.username !== req.params.username
  ) {
    res.status(403);
    res.send({ message: 'You are not allowed to delete other users.' });
    return;
  }

  const username = req.params.username;
  const user = await User.findOne({ username: username })
    .populate('role')
    .exec();

  const adminRole = await Role.findOne({ name: 'admin' }).exec();
  const admins = await User.find({ role: adminRole }).exec();

  if (user.role.name === 'admin' && admins.length === 1) {
    res.status(406);
    res.send({ message: 'You must always have atleast one admin account.' });
    return;
  }

  if (!user) {
    res.status(400);
    res.send({ message: 'This user does not exist.' });
    return;
  }

  await User.findByIdAndDelete(user._id);
  res.send({ message: 'user has been deleted.' });
});

// update user, right now you can only update a users role
const updateUser = asyncHandler(async (req, res) => {
  // checks to see if cookie session id is existing
  if (!req.session.id) {
    res.status(401);
    res.send({ message: 'Unauthorized save attempt.' });
    return;
  }

  //(now checks so the cookie name and localstorage name is same)
  if (
    req.session.role.name !== 'admin' &&
    req.session.username !== req.params.username
  ) {
    res.status(403);
    res.send({ message: 'You are not allowed to update other users.' });
    return;
  }

  const user = await User.findOne({ username: req.params.username })
    .populate('role')
    .exec();

  if (!user) {
    res.status(400);
    res.send({ message: 'This user does not exist.' });
    return;
  }

  if (req.body.role) {
    const roleId = req.body.role;
    const role = await Role.findById(roleId);

    if (!role) {
      res.status(400);
      res.send({ message: 'The specified role does not exist.' });
      return;
    }

    const adminRole = await Role.findOne({ name: 'admin' }).exec();
    const admins = await User.find({ role: adminRole }).exec();

    if (
      user.role.name === 'admin' &&
      req.body.role !== adminRole._id.toString() &&
      admins.length === 1
    ) {
      res.status(406);
      res.send({ message: 'You must always have atleast one admin account.' });
      return;
    }

    user.role = role;
  }

  if (req.body.bio) user.bio = req.body.bio;
  if (req.body.avatar) user.avatar = req.body.avatar;
  if (req.body.backgroundimage) user.backgroundimage = req.body.backgroundimage;
  if (req.body.email) user.email = req.body.email;
  if (req.body.username) {
    if (req.session.username === req.params.username) {
      req.session.username = req.body.username;
    }
    user.username = req.body.username;
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
  }
  if (req.body.website) user.website = req.body.website;

  await user.save();

  res.send({ username: user.username, email: user.email, role: user.role });
});

// Get all users
const getUsers = asyncHandler(async (req, res) => {
  if (req.session.role.name !== 'admin') {
    res.status(403);
    res.send({ message: 'You do not have access to this function' });
    return;
  }

  const users = await User.find().populate('role');
  if (!users) {
    res.send({ message: 'No users can be found.' });
    return;
  }

  res.json(
    users.map((user) => {
      return {
        username: user.username,
        email: user.email,
        role: user.role,
      };
    })
  );
});

const getRoles = asyncHandler(async (req, res) => {
  if (req.session.role.name !== 'admin') {
    res.status(403);
    res.send({ message: 'You do not have access to this function' });
    return;
  }

  const roles = await Role.find();
  if (!roles) {
    res.send({ message: 'No roles can be found.' });
    return;
  }

  res.json(roles);
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  getCurrentUser,
  deleteUser,
  logoutUser,
  getRoles,
  updateUser,
};
