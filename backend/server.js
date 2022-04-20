const express = require('express')
const colors = require('colors')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/db')

connectDB()

const port = 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/blogPosts', require('./routes/blogPostRoutes'))


app.listen(port, () => {
  console.log(`server running on port ${port}`.magenta)
})



