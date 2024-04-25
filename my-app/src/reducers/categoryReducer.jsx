import {
    GET_ALL_CATEGORIES_SUCCESS,
    ADD_CATEGORY_SUCCESS,
    EDIT_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    CATEGORY_ERROR
  } from "../actions/categoryAction";
  
  const initialState = {
    categories: [],
    error: null
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload,
          error: null
        };
      case ADD_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: [...state.categories, action.payload],
          error: null
        };
      case EDIT_CATEGORY_SUCCESS:
        const updatedCategories = state.categories.map(category =>
          category._id === action.payload._id ? action.payload : category
        );
        return {
          ...state,
          categories: updatedCategories,
          error: null
        };
      case DELETE_CATEGORY_SUCCESS:
        const filteredCategories = state.categories.filter(category =>
          category._id !== action.payload
        );
        return {
          ...state,
          categories: filteredCategories,
          error: null
        };
      case CATEGORY_ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  