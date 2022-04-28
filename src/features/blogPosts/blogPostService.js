import axios from 'axios';

const API_URL = 'http://localhost:5000/api/blogPosts';

// Create new Blog post
const createBlog = async (blogData) => {
  const response = await axios.post(API_URL, blogData, {
    withCredentials: true,
  });

  return response.data;
};

// Get Blog posts
const getBlog = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// Delete Blog post
const deleteBlog = async (blogId) => {
  const response = await axios.delete(API_URL + blogId, {
    withCredentials: true,
  });

  return response.data;
};

const blogService = {
  createBlog,
  getBlog,
  deleteBlog,
};

export default blogService;
