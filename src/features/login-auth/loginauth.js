import {
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_SUCCESS,
  DELETE_SUCCESS
} from './logintype'

import loginauthservice from './loginauthservice'
import store from './userstore'

export const register = async (username, email, password) => {
  try {
    const user = await loginauthservice.register(username, email, password)
    store.dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: user },
    })

    return user
  }

  catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.toString()

    store.dispatch({ type: REGISTER_FAIL })
    throw error
  }
}

export const update = async(username, newUserData) => {
    const user = await loginauthservice.updateUser(username, newUserData)

    store.dispatch({
      type: UPDATE_SUCCESS,
      payload: { user: user },
    });
    return user; 
}

export const deleteuser = async(username) => {
  const user = await loginauthservice.deleteUser(username)

  store.dispatch({
    type: DELETE_SUCCESS,
    payload: { user: user },
  });
  return user; 
}


export const login = async (email, password) => {
  try {
    const user = await loginauthservice.login(email, password)

    store.dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: user },
    });
    return user;
  }
  catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    store.dispatch({
      type: LOGIN_FAIL,
    });

    throw error;
  }
}

export const logout = async () => {
  await loginauthservice.logout()
  store.dispatch({ type: LOGOUT })
}