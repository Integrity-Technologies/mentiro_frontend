// categoryActions.js
import axios from "axios";
import { getToken } from "../actions/authActions"; // Import getToken function from authActions

// Action types
export const GET_ALL_CATEGORIES_SUCCESS = "GET_ALL_CATEGORIES_SUCCESS";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const EDIT_CATEGORY_SUCCESS = "EDIT_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const CATEGORY_ERROR = "CATEGORY_ERROR";

const baseURL = "http://localhost:5000/api";

// Action creators
export const getAllCategories = () => async (dispatch) => {
  try {
    const token = getToken(); // Retrieve token from local storage
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Set authorization header
      }
    };
    const res = await axios.get(`${baseURL}/category/Allcategory`, axiosConfig);
    console.log(res, token);
    dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: res.data });
    return res.data;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data.error);
    console.log(errorMessage);
    dispatch({ type: CATEGORY_ERROR, payload: errorMessage });
    throw error;
  }
};

export const addCategory = (categoryData) => async (dispatch) => {
  try {
    const token = getToken(); // Retrieve token from local storage
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Set authorization header
      }
    };
   
    const res = await axios.post(`${baseURL}/category/create`, categoryData, axiosConfig);
    console.log(res, token)
    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: res.data });
    return res.data;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data.error);
    console.log(errorMessage);
    dispatch({ type: CATEGORY_ERROR, payload: errorMessage });
    throw error;
  }
};
export const editCategory = (categoryId, categoryData) => async (dispatch) => {
  try {
    const token = getToken(); // Retrieve token from local storage
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Set authorization header
      }
    };
    const res = await axios.put(`${baseURL}/category/edit/${categoryId}`, categoryData, axiosConfig);
    if (res.status >= 200 && res.status < 300) {
      dispatch({ type: EDIT_CATEGORY_SUCCESS, payload: categoryId });
    } else {
      // Handle unexpected status codes (optional)
      console.error('Unexpected status code:', res.status);
    }
    return res.data;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data.error);
    console.log(errorMessage);
    dispatch({ type: CATEGORY_ERROR, payload: errorMessage });
    throw error;
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    const token = getToken();
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const res = await axios.delete(`${baseURL}/category/delete/${categoryId}`, axiosConfig);
    // Check if deletion was successful (status code 2xx)
    if (res.status >= 200 && res.status < 300) {
      dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: categoryId });
    } else {
      // Handle unexpected status codes (optional)
      console.error('Unexpected status code:', res.status);
    }
    return res.data;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data.error);
    console.log(errorMessage);
    dispatch({ type: CATEGORY_ERROR, payload: errorMessage });
    throw error;
  }
};
