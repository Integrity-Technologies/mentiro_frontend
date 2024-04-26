// userActions.js
import axios from "axios";

export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";


export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/users/Allusers");
    console.log(res.data);
    dispatch({ type: FETCH_USERS_SUCCESS, payload: res.data });
    return res.data;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data.error);
    console.log(errorMessage);
    dispatch({ type: USER_ERROR, payload: errorMessage });
    throw error;
  }
};

// export const fetchUsers = () => async (dispatch) => {
//   try {
//     const response = await axios.get("http://localhost:5000/api/users/Allusers");
//     const data = response.data; // Access the data property of the response
//     dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     dispatch({ type: USER_ERROR, payload: error.message });
//     throw error;
//   }
// };
export const addUser = newUser => async dispatch => {
  try {
    const response = await fetch("http://localhost:5000/api/users/Allusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
    const data = await response.json();
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
    const response = await axios.put(
      `http://localhost:5000/api/users/update/${userId}`, { first_name: updatedUser.first_name, last_name: updatedUser.last_name, email: updatedUser.email, password: updatedUser.password, phone: updatedUser.phone }
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
