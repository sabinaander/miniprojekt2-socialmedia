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
  console.log(userRole);

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

// Get user by username
const getUser = asyncHandler(async (req, res) => {

  const username = req.params.username
  const user = await User.findOne({ username: username }).exec()

  if (!user) {
    res.status(400);
    res.send({ message: 'This user does not exist.' });
    return;
  }
  user.password = ''

  res.json(user);
});

// delete user by username
const deleteUser = asyncHandler(async (req, res) => {

  const username = req.params.username
  const user = await User.findOne({ username: username }).exec()


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
  if(!req.session.id){
    res.status(401);
    res.send({ message: 'Unauthorized save attempt.' });
    return;
  }

  const username = req.params.username

  // todo: maybe allow admins.   
  //(now checks so the cookie name and localstorage name is same)
  if(req.session.username !== username){
    res.status(403);
    res.send({ message: 'Not allowed to update other users.' });
    return;
  }

  const username = req.params.username;

  const roleId = req.body.role;
  console.log(req.body)


  const user = await User.findOne({ username: username }).exec()

  if (!user) {
    res.status(400);
    res.send({ message: 'This user does not exist.' });
    return;
  }

  const role = await Role.findById(roleId);

  if (!role) {
    res.status(400);
    res.send({ message: 'The specified role does not exist.' });
    return;
  }

  user.role = role;
  user.bio = req.body.bio;
  user.avatar = req.body.avatar;
  user.backgroundimage = req.body.backgroundimage;
  user.email = req.body.email;
  user.username = req.body.username;
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    user.password = hashedPassword
  }
  user.website = req.body.website;

  await user.save();

  res.send({ username: user.username, email: user.email, _id: user._id });
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
const getRoles = asyncHandler(async (req, res) => {
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
  deleteUser,
  logoutUser,
  getRoles,
  updateUser,
};
