const express = require('express')
const router = express.Router()
const {getBlogPosts,editBlogPosts, addBlogPosts, deleteBlogPosts} = require('../controllers/blogPostController')

router.route('/').get(getBlogPosts).post(addBlogPosts)
router.route('/:id').put(editBlogPosts).delete(deleteBlogPosts)


module.exports = router
