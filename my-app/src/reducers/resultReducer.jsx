import { FETCH_RESULTS_REQUEST, FETCH_RESULTS_SUCCESS, FETCH_RESULTS_FAILURE } from '../actions/resultAction';

const initialState = {
  results: [],
  error: ''
};

const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.payload,
        error: ''
      };
    case FETCH_RESULTS_FAILURE:
      return {
        ...state,
        results: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default resultReducer;
