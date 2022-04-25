import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import loginauthreducer from './reducers/loginauthreducer'
import postsReducer from '../blogPosts/postsSlice'
const middleware = [thunk]

const store = configureStore({
  reducer: {
    auth: loginauthreducer ,
    posts: postsReducer,
  },
})

export default store
