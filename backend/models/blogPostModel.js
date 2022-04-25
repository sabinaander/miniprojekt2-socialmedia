const mongoose = require('mongoose')

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add something'],
    },
    content: {
      type: String,
      required: [true, 'Please add something'],
    },
    author: String,
    // likes: Number,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', blogPostSchema)
