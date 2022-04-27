import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const POSTS_URL = 'http://localhost:5000/api/blogPosts'

const initialState = {
  posts: [],
  status: 'idle', //| 'loading' | 'succeeded' | 'failed'
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POSTS_URL)
  return response.data
})
export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
  }
)
export const editPost = createAsyncThunk(
  'posts/editPost',
  async (updatedPost) => {
    const { id } = updatedPost
    try {
      const response = await axios.patch(`${POSTS_URL}/${id}`, updatedPost)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
)
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const response = await axios.delete(`${POSTS_URL}/${id}`)
  return response.data
})
export const likePost = createAsyncThunk('posts/likePost', async (id) => {
  const response = await axios.patch(`${POSTS_URL}/${id}/likePost`)

  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        )
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        )
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts.filter((post) => post._id !== action.payload)
      })
  },
})

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error

export default postsSlice.reducer
