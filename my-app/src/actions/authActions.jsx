import axios from "axios";

// Action types
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";


export const getToken = () => {
  return localStorage.getItem("token");
};

// Action creators
export const signUp = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, userData);
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    return { success: true, data: res.data };
  } catch (error) {
    // console.log(
    //   JSON.stringify(error.response.data.error) + " from AUTH_ACTION"
    // ); // Stringify and log the response data
    const errorMessage = JSON.stringify(error.response.data.error);
    // console.log(errorMessage);
    dispatch({ type: AUTH_ERROR, payload: errorMessage });
    return { success: false, error: errorMessage };
  }
};

// authAction.jsx



export const login = (userData) => async (dispatch) => {
  try {
    console.log(process.env.REACT_APP_API_URL);
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, userData);
    const { result, token } = res.data;

    // Store user data as a string in localStorage
    localStorage.setItem("user", JSON.stringify(result));
    localStorage.setItem("token", token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: result,
        token,
      },
    });

    return res.data;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data.error);
    // console.log(errorMessage);
    dispatch({
      type: AUTH_ERROR,
      payload: errorMessage,
    });
    throw error;
  }
};


export const logout = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(token)
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/logout`, config);
    // console.log("~ logout ~ res:", res);

    localStorage.removeItem("token");
    localStorage.clear();
    // You may want to clear user data from localStorage or perform any other cleanup here
    dispatch({ type: LOGOUT_SUCCESS });

    return res.data
    // Optionally, redirect the user to the login page or any other page after logout
    // history.push('/login'); // Assuming you have access to history object or use Redirect in the Logout component
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

export const forgotPassword = (userData) => async (dispatch) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/password/forgot`, userData);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: res.data, // Assuming the backend returns success message upon successful password reset request
    });
    return res.data;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data.error);
    // console.log(errorMessage);
    dispatch({
      type: AUTH_ERROR,
      payload: errorMessage, // Assuming the backend returns error message in case of failure
    });
    throw error;
  }
};

export const resetPassword = (passwordData) => async (dispatch) => {
  try {
    const { token, newPassword, confirmPassword } = passwordData; // Destructure passwordData object
    // const token = "adfd1493fb58d12b4210d661f3eb19301d912ef5b1b70b286badf9a4a9550fc5"
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/password/reset`, {
      newPassword,
      confirmPassword,
      token,
    });
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data });
    return { success: true, data: res.data };
  } catch (error) {
    // console.log(
    //   JSON.stringify(error.response.data.error) + " from AUTH_ACTION"
    // );
    const errorMessage = JSON.stringify(error.response.data.error);
    // console.log(errorMessage);
    dispatch({ type: AUTH_ERROR, payload: errorMessage });
    return { success: false, error: errorMessage };
  }
};
