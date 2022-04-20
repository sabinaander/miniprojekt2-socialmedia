// defines the user 
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
      userName: {
        type: String,
        required: [true, 'Please add a name'],
      },
      email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
      },
      password: {
        type: String,
        required: [true, 'Please add a password'],
      },
    },
    {
      timestamps: true,
    }
  )
  
  module.exports = mongoose.model('User', userSchema)
// const User = mongoose.model(
//     'User',
//     new mongoose.Schema({
//         email: String,
//         password: String,
//         roles: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "role"
//         }
//         ]
//     })
// )

// module.exports = User