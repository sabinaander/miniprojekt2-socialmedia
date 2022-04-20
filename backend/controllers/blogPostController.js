const asyncHandler = require('express-async-handler');
const Post = require('../models/blogPostModel')

// @desc Get Blogposts
// @route GET /api/blogPosts
const getBlogPosts = asyncHandler( async (req, res) =>{
  const blogs = Post.find()
  res.status(200).json(blogs)
})
// @desc Add Blogpost
// @route POST /api/blogPosts
const addBlogPosts = asyncHandler( async (req, res) =>{
  if(!req.body.text) {
    res.status(400)
    throw new Error('Please add some text')
  }

  const blog = await Post.create({
    text: req.body.text
  })

  res.status(200).json({msg: 'Add blogposts'})
})
// @desc Get Blogposts
// @route PUT /api/blogPosts/:id
const editBlogPosts = asyncHandler( async (req, res) =>{
  const blogs = await Post.findById(req.params.id)

  if(!blogs) {
    res.status(400)
    throw new Error('Blog not found')
  }
  const updatedBlog = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json({updatedBlog})
})
// @desc Get Blogposts
// @route DELETE /api/blogPosts/:id
const deleteBlogPosts = asyncHandler( async (req, res) =>{
  res.status(200).json({msg: `Delete blogposts ${req.params.id}`})
})

module.exports = {
  getBlogPosts,
  addBlogPosts,
  editBlogPosts,
  deleteBlogPosts
}