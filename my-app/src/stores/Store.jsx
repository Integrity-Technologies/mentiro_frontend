// store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import {thunk} from "redux-thunk"
import categoryReducer from '../reducers/categoryReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer
  // Add other reducers here if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
