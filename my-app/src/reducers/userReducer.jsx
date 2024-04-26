// userReducer.js
import {
    FETCH_USERS_SUCCESS,
    ADD_USER_SUCCESS,
    EDIT_USER_SUCCESS,
    DELETE_USER_SUCCESS,
    USER_ERROR
  } from "../actions/userAction";
  
  const initialState = {
    users: [],
    error: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          users: action.payload,
          error: null
        };
      case ADD_USER_SUCCESS:
        return {
          ...state,
          users: [...state.users, action.payload],
          error: null
        };
      case EDIT_USER_SUCCESS:
        const updatedUsers = state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        );
        return {
          ...state,
          users: updatedUsers,
          error: null
        };
      case DELETE_USER_SUCCESS:
        const filteredUsers = state.users.filter(user =>
          user.id !== action.payload
        );
        return {
          ...state,
          users: filteredUsers,
          error: null
        };
      case USER_ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  