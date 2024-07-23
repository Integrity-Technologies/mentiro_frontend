import {
    FETCH_CANDIDATES_SUCCESS,
    ADD_CANDIDATE_SUCCESS,
    EDIT_CANDIDATE_SUCCESS,
    DELETE_CANDIDATE_SUCCESS,
    CANDIDATE_ERROR,
  } from "../actions/candidateAction";
  
  const initialState = {
    candidates: [],
    error: null,
  };
  
  const candidateReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CANDIDATES_SUCCESS:
        return {
          ...state,
          candidates: action.payload, // Handle empty array correctly
          error: null,
        };
      case ADD_CANDIDATE_SUCCESS:
        return {
          ...state,
          candidates: [...state.candidates, action.payload],
          error: null,
        };
      case EDIT_CANDIDATE_SUCCESS:
        return {
          ...state,
          candidates: state.candidates.map((candidate) =>
            candidate.id === action.payload.id ? action.payload : candidate
          ),
          error: null,
        };
      case DELETE_CANDIDATE_SUCCESS:
        return {
          ...state,
          candidates: state.candidates.filter(
            (candidate) => candidate.id !== action.payload.id
          ),
          error: null,
        };
      case CANDIDATE_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default candidateReducer;
  