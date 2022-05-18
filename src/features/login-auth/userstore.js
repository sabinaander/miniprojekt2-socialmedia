import { configureStore } from '@reduxjs/toolkit';
import loginauthreducer from './reducers/loginauthreducer';
import postsReducer from '../blogPosts/postsSlice';

const store = configureStore({
  reducer: {
    auth: loginauthreducer,
    posts: postsReducer,
  },
});

export default store;
