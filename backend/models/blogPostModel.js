const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema(
    
  {
    text: {
      type: String,
      required: [true, 'Please add something']
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', blogPostSchema)