// authReducer.jsx

import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  AUTH_ERROR,
} from "../actions/authActions";

// Import initialState here or define it if not imported
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
    default:
      return state;
  }
};

export default authReducer;
