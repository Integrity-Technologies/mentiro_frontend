import axios from "axios";

export const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
export const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE';



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
    // Simulating API call
    axios.get('http://localhost:5000/api/result/allResults')
      .then(response => response.data)
      .then(data => {
        dispatch(fetchResultsSuccess(data));
      })
      .catch(error => {
        dispatch(fetchResultsFailure(error.message));
      });
  };
};
