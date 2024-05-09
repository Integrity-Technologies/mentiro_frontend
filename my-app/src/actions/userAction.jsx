// userActions.js
import axios from "axios";
import { getToken } from "../actions/authActions"; // Import getToken function from authActions


export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";


export const getAllUsers = () => async (dispatch) => {
  try {
    // Fetch users data from the API
    const res = await axios.get("http://localhost:5000/api/users/Allusers");

    // Format created_at field for each user
    const formattedUsers = res.data.map((user) => ({
      ...user,
      created_at: user.created_at.split("T")[0], // Extract date part only
      // Omit the password field
      password: "*****",
    }));

    // Dispatch the action with formatted user data
    dispatch({ type: FETCH_USERS_SUCCESS, payload: formattedUsers });

    // Return the formatted user data
    return formattedUsers;
  } catch (error) {
    // Handle errors and dispatch an error action
    const errorMessage = error.response?.data?.error || "Error fetching users";
    dispatch({ type: USER_ERROR, payload: errorMessage });
    throw error;
  }
};





export const addUser = (newUser) => async (dispatch) => {
  try {
    console.log(newUser);
    const response = await axios.post("http://localhost:5000/api/users/add", newUser);
    const data =  response.data;
    dispatch({ type: ADD_USER_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error adding user:", error);
    dispatch({ type: USER_ERROR, payload: error.message });
    return null;
  }
};


export const editUser = (userId, updatedUser) => async dispatch => {
  console.log(updatedUser);
  try {
    const token = getToken(); // Retrieve token from local storage
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Set authorization header
      }
    };
    console.log(token);
    const response = await axios.put(
      `http://localhost:5000/api/users/update/${userId}`, { first_name: updatedUser.first_name, last_name: updatedUser.last_name, email: updatedUser.email, password: updatedUser.password, phone: updatedUser.phone }, axiosConfig
    );
    const data = response.data;
    dispatch({ type: EDIT_USER_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error editing user:", error);
    dispatch({ type: USER_ERROR, payload: error.message });
    return null;
  }
};

export const deleteUser = userId => async dispatch => {
  try {
    console.log(userId);
    const response = await axios.delete(
      `http://localhost:5000/api/users/delete/${userId}`,
    );
    const data = await response.json();
    dispatch({ type: DELETE_USER_SUCCESS, payload: response.data });
    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    dispatch({ type: USER_ERROR, payload: error.message });
    return null;
  }
};
