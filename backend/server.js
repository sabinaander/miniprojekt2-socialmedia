const express = require('express')
require('colors')
const cors = require('cors')
// const mongoose = require('mongoose')
const connectDB = require('./config/db')
const cookieSession = require('cookie-session')
connectDB()

const port = 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(cookieSession({
  // fix secret with env later...
  secret: '1337',
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: 'strict',
  secure: false,
}))


app.use('/api/blogPosts', require('./routes/blogPostRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => {
  console.log(`server running on port ${port}`.magenta)
})
