import axios from "axios";
import { getToken } from "../actions/authActions"; // Import getToken function from authActions


// Action Types
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// Action Creators
export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    const token = getToken();
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(fetchUserRequest());
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/me`, axiosConfig) // Change the URL to match your backend route for fetching user data
      .then((response) => {
        // If the request is successful, dispatch fetchUserSuccess action with user data
        dispatch(fetchUserSuccess(response.data));
      })
      .catch((error) => {
        // If there's an error, dispatch fetchUserFailure action with the error message
        dispatch(fetchUserFailure(error.message));
      });
  };
};
