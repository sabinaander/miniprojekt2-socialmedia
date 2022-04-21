const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
require('dotenv').config()

// @desc Register new user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400)
    res.send('Please fill in all fields')
    return
  }

  // Check if user exist
  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    res.send('User already exists.')
    return
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    username, email, password: hashedPassword
  })

  if (!user) {
    res.status(400)
    res.send('Invalid user data')
    return
  }

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id)
  })

})

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email: email }).exec()

  console.log(user)
  // checks to see if user exists
  if (!user) {
    res.status(400)
    res.send('Incorrect login details')
    return
  }
  // checks password
  if (!await bcrypt.compare(password, user.password)) {
    res.status(400)
    res.send('Incorrect login details')
    return
  }

  // all correct
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id)
  })

})


// Get user by id
const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id

  const user = await User.findById(id)

  if (!user) {
    res.status(400)
    res.send('This user does not exist.')
    return
  }

  res.json(user)
})

// delete user by id
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id

  const user = await User.findById(id)

  if (!user) {
    res.status(400)
    res.send('This user does not exist.')
    return
  }

  await User.findByIdAndDelete(id)
  res.send('user has been deleted.')
})



// Get all users
const getUsers = asyncHandler(async (req, res) => {

  const users = await User.find({})

  if (!users) {
    res.send('No users can be found.')
    return
  }

  res.json(users)
})


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}


module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  deleteUser,
  verifyToken,
}