const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose

// db.user = require('/userModel')
// db.post = require('/Post')
// db.role = require('/roleModel')
// db.ROLES = ['user', 'admin', 'moderator', 'superadmin']

module.exports = db