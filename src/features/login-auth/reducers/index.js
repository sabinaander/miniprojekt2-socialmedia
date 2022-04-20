import { combineReducers } from "@reduxjs/toolkit";
import loginauthreducer from "./loginauthreducer";
import { setMessage } from  "./messagereducer"

export default combineReducers({ loginauthreducer, setMessage})