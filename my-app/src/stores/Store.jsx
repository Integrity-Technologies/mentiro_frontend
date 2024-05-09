// store.js

import { createStore, applyMiddleware, combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';
import {thunk} from "redux-thunk"
import categoryReducer from '../reducers/categoryReducer';
import userReducer from '../reducers/userReducer';
import testReducer from '../reducers/testReducer';
import companyReducer from '../reducers/companyReducer';
import candidateReducer from '../reducers/candidateReducer';
import resultReducer from '../reducers/resultReducer';
import QuestionReducer from '../reducers/QuestionReducer';
import assessmentReducer from '../reducers/AssesmentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  user: userReducer,
  test: testReducer,
  company: companyReducer,
  candidates: candidateReducer,
  results: resultReducer,
  question: QuestionReducer,
  assessment: assessmentReducer
  // Add other reducers here if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
