import axios from "axios";

// Action types
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";
const baseURL = "http://localhost:5000/api";

// Action creators
export const signUp = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/users/signup`, userData);
    console.log("~ signUp ~ res:", res);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data, // Assuming the backend returns user data and JWT token upon successful signup
    });
  } catch (error) {
    // if (
    //   error.response.status === 409 &&
    //   error.response.data.message === "Email already exists"
    // ) {
    console.log(error + "from AUTH_ACTION");
    dispatch({
      type: AUTH_ERROR,
      payload: "Email is already registered. Please use a different email.",
    });
    // } else {
    //   dispatch({
    //     type: AUTH_ERROR,
    //     payload: error.response.data.message,
    //   });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/users/login`, userData);
    console.log("~ login ~ res:", res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, // Assuming the backend returns user data and JWT token upon successful login
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.message, // Assuming the backend returns error message in case of failure
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseURL}/api/forgot-password`, { email });
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: res.data, // Assuming the backend returns success message upon successful password reset request
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.message, // Assuming the backend returns error message in case of failure
    });
  }
};
