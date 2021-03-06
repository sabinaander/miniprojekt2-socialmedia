const express = require('express')
const router = express.Router()
const {
  getBlogPosts,
  getBlogPost,
  editBlogPosts,
  addBlogPosts,
  deleteBlogPosts,
  likePost,
} = require('../controllers/blogPostController')

router.route('/').get(getBlogPosts).post(addBlogPosts)
router
  .route('/:id')
  .get(getBlogPost)
  .patch(editBlogPosts)
  .delete(deleteBlogPosts)
router.patch('/:id/likePost', likePost)

module.exports = router
