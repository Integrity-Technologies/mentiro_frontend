// testReducer.jsx
import {
    FETCH_TESTS_SUCCESS,
    ADD_TEST_SUCCESS,
    EDIT_TEST_SUCCESS,
    DELETE_TEST_SUCCESS,
    TEST_ERROR,
  } from '../actions/testAction';
  
  const initialState = {
    tests: [],
    error: null,
  };
  
  const testReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TESTS_SUCCESS:
        return {
          ...state,
          tests: action.payload,
          error: null,
        };
      case ADD_TEST_SUCCESS:
        return {
          ...state,
          tests: [...state.tests, action.payload],
          error: null,
        };
      case EDIT_TEST_SUCCESS:
        return {
          ...state,
          tests: state.tests.map((test) =>
            test.id === action.payload.id ? action.payload : test
          ),
          error: null,
        };
      case DELETE_TEST_SUCCESS:
        return {
          ...state,
          tests: state.tests.filter((test) => test.id !== action.payload),
          error: null,
        };
      case TEST_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default testReducer;
  