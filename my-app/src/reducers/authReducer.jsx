// authReducer.js

import { SIGNUP_SUCCESS, LOGIN_SUCCESS, FORGOT_PASSWORD_SUCCESS, AUTH_ERROR, LOGOUT_SUCCESS } from '../actions/authActions';

const initialState = {
  user: null,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.user.result.permissions);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
