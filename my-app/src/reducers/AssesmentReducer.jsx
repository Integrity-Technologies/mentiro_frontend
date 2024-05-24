import {
  GET_ALL_ASSESSMENTS_SUCCESS,
  ADD_ASSESSMENT_SUCCESS,
  EDIT_ASSESSMENT_SUCCESS,
  DELETE_ASSESSMENT_SUCCESS,
  ASSESSMENT_ERROR,
  INVITE_ASSESSMENT_SUCCESS,
  GET_WORK_ARRANGEMENTS_SUCCESS,
  GET_ALL_JOB_LOCATION_SUCCESS
} from "../actions/AssesmentAction";

const initialState = {
  assessments: [],
  workArrangements: [], // Add initial state for work arrangements
  jobLocations: [],
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
      case GET_WORK_ARRANGEMENTS_SUCCESS:
        return {
          ...state,
          workArrangements: action.payload,
        };
        case GET_ALL_JOB_LOCATION_SUCCESS:
        return {
          ...state,
          jobLocations: action.payload,
        };
    case ADD_ASSESSMENT_SUCCESS:
      return {
        ...state,
        assessments: [...state.assessments, action.payload],
        error: null,
      };
    case INVITE_ASSESSMENT_SUCCESS:
      return {
        assessments: action.payload,
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
