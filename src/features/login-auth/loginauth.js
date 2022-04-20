import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    CLEAR_MESSAGE
} from './logintype'

import loginauthservice from './loginauthservice'

export const register = ( email, password) => (dispatch) => {
    return loginauthservice.register( email, password).then(
        (response) => {
            dispatch({ type: REGISTER_SUCCESS })
            dispatch({ type: SET_MESSAGE, payload: response.data.message })
            return Promise.resolve()
        }
        ,
        (error) => {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.toString()

            dispatch({ type: REGISTER_FAIL })
            dispatch({ type: SET_MESSAGE, payload: message })
            return Promise.reject()
        }
    )
}

export const login = (email, password) => (dispatch) => {
    return loginauthservice.login(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };

export const logout = () => (dispatch) => {
    loginauthservice.logout()
    dispatch({ type: LOGOUT })
}