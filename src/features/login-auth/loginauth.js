import {
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE
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
    store.dispatch({ type: SET_MESSAGE, payload: message })
    throw error
  }
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

    store.dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
    throw error;
  }
}

export const logout = async () => {
  await loginauthservice.logout()
  store.dispatch({ type: LOGOUT })
}