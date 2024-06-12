import axios from 'axios';
import { getToken } from "../actions/authActions"; // Import getToken function from authActions


export const FETCH_TESTS_SUCCESS = 'FETCH_TESTS_SUCCESS';
export const ADD_TEST_SUCCESS = 'ADD_TEST_SUCCESS';
export const EDIT_TEST_SUCCESS = 'EDIT_TEST_SUCCESS';
export const DELETE_TEST_SUCCESS = 'DELETE_TEST_SUCCESS';
export const TEST_ERROR = 'TEST_ERROR';



export const fetchTestsSuccess = (tests) => ({
    type: FETCH_TESTS_SUCCESS,
    payload: tests,
  });
  
  export const addTestSuccess = (test) => ({
    type: ADD_TEST_SUCCESS,
    payload: test,
  });
  
  export const editTestSuccess = (test) => ({
    type: EDIT_TEST_SUCCESS,
    payload: test,
  });
  
  export const deleteTestSuccess = (id) => ({
    type: DELETE_TEST_SUCCESS,
    payload: id,
  });
  
  export const testError = (error) => ({
    type: TEST_ERROR,
    payload: error,
  });



export const fetchTests = () => async (dispatch) => {
    try {
      const token = getToken(); // Retrieve token from local storage
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}` // Set authorization header
        }
      };
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/test/allTests`, axiosConfig);
      dispatch(fetchTestsSuccess(response.data));
      // console.log(response.data);
    } catch (error) {
      dispatch(testError(error.message));
    }
  };
  
  export const addTest = (newTest) => async (dispatch) => {
    try {
        const token = getToken(); // Retrieve token from local storage
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}` // Set authorization header
          }
        };
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/test/create/test`, newTest, axiosConfig);
      dispatch(addTestSuccess(response.data));
      // console.log(response.data);
    } catch (error) {
      dispatch(testError(error.message));
    }
  };
  
  export const editTest = (id, updatedTest) => async (dispatch) => {
    // console.log(updatedTest, id + "From edit test action");
    try {
      const token = getToken(); // Retrieve token from local storage
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}` // Set authorization header
        }
      };
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/test/edit/test/${id}`, updatedTest, axiosConfig);
      dispatch(editTestSuccess(response.data));
      // console.log(response.data);
    } catch (error) {
      dispatch(testError(error.message));
    }
  };
  
  
  export const deleteTest = (id) => async (dispatch) => {
    try {
      const token = getToken(); // Retrieve token from local storage
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}` // Set authorization header
        }
      };
      await axios.delete(`${process.env.REACT_APP_API_URL}/test/delete/test/${id}`, axiosConfig);
      dispatch(deleteTestSuccess(id));
      // console.log(id);
    } catch (error) {
      dispatch(testError(error.message));
    }
  };