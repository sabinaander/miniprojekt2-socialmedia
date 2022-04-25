const mongoose = require('mongoose')

const blogPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add something'],
    },
    content: {
      type: String,
      required: [true, 'Please add something'],
    },
    author: String,
    likes: Number,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', blogPostSchema)
