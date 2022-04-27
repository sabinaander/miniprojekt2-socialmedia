const asyncHandler = require('express-async-handler');
const Post = require('../models/blogPostModel');
const mongoose = require('mongoose');

// const User = require('../models/userModel') //- to be implemented

// @desc Get Blogposts
// @route GET /api/blogPosts
// @access Public
const getBlogPosts = asyncHandler(async (req, res) => {
  const blogs = await Post.find({});
  res.status(200).json(blogs);
});
// @desc Get Blogposts
// @route GET /api/blogPosts/:id
// @access Public
const getBlogPost = asyncHandler(async (req, res) => {
  const blog = await Post.findById(req.params.id);
  if (!blog) {
    res.status(400);
    throw new Error('Blog not found');
  }
  res.status(200).json(blog);
});

// @desc Add Blogpost
// @route POST /api/blogPosts
// @access Private
const addBlogPosts = asyncHandler(async (req, res) => {
  // checks to see if cookie session id is existing
  if (!req.session.id) {
    res.status(401);
    res.send({ message: 'Unauthorized post attempt.' });
    return;
  }

  if (!req.body) {
    res.status(400);
    throw new Error('Please add some text');
  }

  const blog = await Post.create({
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    author: req.body.author,
  });

  res.status(200).json(blog);
});

// @desc Edit Blogposts
// @route PUT /api/blogPosts/:id
// @access Private
const editBlogPosts = asyncHandler(async (req, res) => {
  // checks to see if cookie session id is existing
  if (!req.session.id) {
    res.status(401);
    res.send({ message: 'Unauthorized save attempt.' });
    return;
  }

  const blog = await Post.findById(req.params.id);
  if (!blog) {
    res.status(400);
    throw new Error('Blog not found');
  }

  if (
    req.session.role.name !== 'admin' &&
    req.session.username !== blog.author
  ) {
    res.status(403);
    res.send({
      message: 'You are not allowed to edit other users blog posts.',
    });
    return;
  }

  const updatedBlog = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBlog);
});
// @desc Delete Blogposts

// @route DELETE /api/blogPosts/:id
// @access Private
const deleteBlogPosts = asyncHandler(async (req, res) => {
  // checks to see if cookie session id is existing
  if (!req.session.id) {
    res.status(401);
    res.send({ message: 'Unauthorized delete attempt.' });
    return;
  }

  const { id } = req.params;
  const blog = await Post.findById(id);
  if (!blog) {
    return res
      .status(404)
      .send({ error: true, msg: 'This post does not exist' });
  }

  if (
    req.session.role.name !== 'admin' &&
    req.session.username !== blog.author
  ) {
    res.status(403);
    res.send({
      message: 'You are not allowed to delete other users blog posts.',
    });
    return;
  }

  const removedPost = await Post.findByIdAndDelete(id);

  res.status(200).json({ msg: `Deleted blogposts ${id}`, data: removedPost });
});

// @desc Add like to Blogposts
// @route PATCH /api/blogPosts/:id
// @access Public
const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await Post.findById(id);

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likes: post.likes + 1 },
    { new: true }
  );

  res.json(updatedPost);
});

module.exports = {
  getBlogPosts,
  getBlogPost,
  addBlogPosts,
  editBlogPosts,
  deleteBlogPosts,
  likePost,
};
