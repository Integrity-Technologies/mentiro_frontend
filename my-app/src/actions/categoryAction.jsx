// categoryActions.js
import axios from "axios";

// Action types
export const GET_ALL_CATEGORIES_SUCCESS = "GET_ALL_CATEGORIES_SUCCESS";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const EDIT_CATEGORY_SUCCESS = "EDIT_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const CATEGORY_ERROR = "CATEGORY_ERROR";

const baseURL = "http://localhost:5000/api";

// Function to get token from local storage
const getToken = () => {
  return localStorage.getItem("token");
};

// Axios configuration with authorization header
const axiosConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
};

// Action creators
export const getAllCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseURL}/category/Allcategory`, axiosConfig);
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
    const res = await axios.post(`${baseURL}/category/create`, categoryData, axiosConfig);
    
    // Assuming the response includes the token
    const { token, ...responseData } = res.data;

    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: responseData, token }); // Dispatching both payload and token
    
    return { responseData, token }; // Returning both responseData and token
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data.error);
    console.log(errorMessage);
    dispatch({ type: CATEGORY_ERROR, payload: errorMessage });
    throw error;
  }
};

export const editCategory = (categoryId, categoryData) => async (dispatch) => {
  try {
    const res = await axios.put(`${baseURL}/categories/${categoryId}`, categoryData, axiosConfig);
    dispatch({ type: EDIT_CATEGORY_SUCCESS, payload: res.data });
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
    const res = await axios.delete(`${baseURL}/categories/${categoryId}`, axiosConfig);
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: categoryId });
    return res.data;
  } catch (error) {
    const errorMessage = JSON.stringify(error.response.data.error);
    console.log(errorMessage);
    dispatch({ type: CATEGORY_ERROR, payload: errorMessage });
    throw error;
  }
};
