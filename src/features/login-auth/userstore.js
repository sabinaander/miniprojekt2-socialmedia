import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import combineReducers from './reducers/index'
import postsReducer from '../blogPosts/postsSlice'
const middleware = [thunk]

const store = configureStore({
  reducer: {
    auth: { combineReducers, middleware },
    posts: postsReducer,
  },
})

export default store
