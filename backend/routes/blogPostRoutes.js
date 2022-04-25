const express = require('express')
const router = express.Router()
const {
  getBlogPosts,
  getBlogPost,
  editBlogPosts,
  addBlogPosts,
  deleteBlogPosts,
} = require('../controllers/blogPostController')

router.route('/').get(getBlogPosts).post(addBlogPosts)
router.route('/:id').get(getBlogPost).put(editBlogPosts).delete(deleteBlogPosts)

module.exports = router
