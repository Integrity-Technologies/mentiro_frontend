import {
    GET_ALL_ASSESSMENTS_SUCCESS,
    ADD_ASSESSMENT_SUCCESS,
    EDIT_ASSESSMENT_SUCCESS,
    DELETE_ASSESSMENT_SUCCESS,
    ASSESSMENT_ERROR,
  } from "../actions/AssesmentAction";
  
  const initialState = {
    assessments: [],
    error: null,
  };
  
  const assessmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_ASSESSMENTS_SUCCESS:
        return {
          ...state,
          assessments: action.payload,
          error: null,
        };
      case ADD_ASSESSMENT_SUCCESS:
        return {
          ...state,
          assessments: [...state.assessments, action.payload],
          error: null,
        };
      case EDIT_ASSESSMENT_SUCCESS:
        return {
          ...state,
          assessments: state.assessments.map((assessment) =>
            assessment.id === action.payload.id ? action.payload : assessment
          ),
          error: null,
        };
      case DELETE_ASSESSMENT_SUCCESS:
        return {
          ...state,
          assessments: state.assessments.filter(
            (assessment) => assessment.id !== action.payload
          ),
          error: null,
        };
      case ASSESSMENT_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default assessmentReducer;