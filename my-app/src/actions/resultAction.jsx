import axios from "axios";
import { getToken } from "../actions/authActions"; // Import getToken function from authActions


export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
export const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE';
export const CREATE_RESULT = 'CREATE_RESULT'; // Add CREATE_RESULT action type


const apiUrl = process.env.REACT_APP_API_URL;
    console.log(`API URL: ${apiUrl}`);

export const fetchResultsSuccess = (results) => {
  return {
    type: FETCH_RESULTS_SUCCESS,
    payload: results
  };
};

export const fetchResultsFailure = (error) => {
  return {
    type: FETCH_RESULTS_FAILURE,
    payload: error
  };
};

export const fetchResults = () => {
  return (dispatch) => {
    const token = getToken(); // Retrieve token from local storage
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Set authorization header
      }
    };
    // Simulating API call
    axios.get(`${process.env.REACT_APP_API_URL}/result/user/results`, axiosConfig)
      .then(response => response.data)
      .then(data => {
        dispatch(fetchResultsSuccess(data));
      })
      .catch(error => {
        dispatch(fetchResultsFailure(error.message));
      });
  };
};




export const getUserResults = () => {
  return (dispatch) => {
    const token = getToken(); // Retrieve token from local storage
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Set authorization header
      }
    };
    // Simulating API call
    axios.get(`${process.env.REACT_APP_API_URL}/result/user/results`, axiosConfig)
      .then(response => response.data)
      .then(data => {
        dispatch(fetchResultsSuccess(data));
      })
      .catch(error => {
        dispatch(fetchResultsFailure(error.message));
      });
  };
};



export const createResult = (resultData) => {
  return (dispatch) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`, // Set authorization header
      },
    };
    axios.post(`${process.env.REACT_APP_API_URL}/result/create`, resultData, axiosConfig)
      .then(response => response.data)
      .then(data => {
        // Assuming the response data contains the resultId
        localStorage.setItem('resultId', data.result.id); // Store resultId in local storage
        dispatch({ type: 'CREATE_RESULT', payload: data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_RESULTS_FAILURE', payload: error.message });
      });
  };
};



export const submitAnswer = (resultData) => { // Define createResult action
  return (dispatch) => {
    const token = getToken(); // Retrieve token from local storage
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Set authorization header
      }
    };
    // Simulating API call
    axios.post(`${process.env.REACT_APP_API_URL}/result/submit`, resultData, axiosConfig)
      .then(response => response.data)
      .then(data => {
        // Assuming the response data contains the newly created result
        dispatch({ type: CREATE_RESULT, payload: data });
      })
      .catch(error => {
        dispatch(fetchResultsFailure(error.message));
      });
  };
};