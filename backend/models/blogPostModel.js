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
    likes: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', blogPostSchema)
