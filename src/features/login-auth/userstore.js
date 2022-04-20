import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import combineReducers from "./reducers/index";
const middleware = [thunk];

const store = configureStore({
   reducer: combineReducers,
   middleware
});

export default store;