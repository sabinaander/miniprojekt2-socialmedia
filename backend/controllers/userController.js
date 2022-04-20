const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')


// @desc Register new user
const registerUser = asyncHandler( async (req,res) => {
  const { userName, email, password } = req.body

  if(!userName || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exist
  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    userName, email, password: hashedPassword
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      // token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// Login user
const loginUser = asyncHandler( async (req,res) => {
  const { email, password } = req.body

  // Check for user email
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      // token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Incorrect login details')
  }
})

// Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, )
// }

module.exports = {
  registerUser,
  loginUser
}