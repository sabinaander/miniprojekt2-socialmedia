const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect('mongodb://localhost:27017/socialmedia');
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    if (err) console.log(err)
    process.exit(1)
  }
}

// const Post = mongoose.model('Post',{title: String, content: String})

// const testPost = new Post({title: 'test test test', content: 'ehhh nånting kanskeee' })
// testPost.save().then(()=> console.log('testpost är sparad'))

module.exports = connectDB