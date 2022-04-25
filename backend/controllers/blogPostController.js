const asyncHandler = require('express-async-handler')
const Post = require('../models/blogPostModel')
// const User = require('../models/userModel') //- to be implemented

// @desc Get Blogposts
// @route GET /api/blogPosts
// @access Public
const getBlogPosts = asyncHandler(async (req, res) => {
  const blogs = await Post.find({})
  res.status(200).json(blogs)
})
// @desc Get Blogposts
// @route GET /api/blogPosts/:id
// @access Public
const getBlogPost = asyncHandler(async (req, res) => {
  const blog = await Post.findById(req.params.id)
  if (!blog) {
    res.status(400)
    throw new Error('Blog not found')
  }
  res.status(200).json(blog)
})

// @desc Add Blogpost
// @route POST /api/blogPosts
// @access Private
const addBlogPosts = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400)
    throw new Error('Please add some text')
  }

  const blog = await Post.create({
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    author: req.body.author,
  })

  res.status(200).json(blog)
})

// @desc Get Blogposts
// @route PUT /api/blogPosts/:id
// @access Private
const editBlogPosts = asyncHandler(async (req, res) => {
  const blogs = await Post.findById(req.params.id)

  if (!blogs) {
    res.status(400)
    throw new Error('Blog not found')
  }
  const updatedBlog = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(200).json(updatedBlog)
})
// @desc Get Blogposts
// @route DELETE /api/blogPosts/:id
// @access Private
const deleteBlogPosts = asyncHandler(async (req, res) => {
  const { id } = req.params
  const removedPost = await Post.findByIdAndDelete(id)
  if (!removedPost) {
    return res
      .status(404)
      .send({ error: true, msg: 'This post does not exist' })
  }

  res.status(200).json({ msg: `Deleted blogposts ${id}`, data: removedPost })
})

module.exports = {
  getBlogPosts,
  getBlogPost,
  addBlogPosts,
  editBlogPosts,
  deleteBlogPosts,
}
