import {
    FETCH_COMPANIES_SUCCESS,
    ADD_COMPANY_SUCCESS,
    EDIT_COMPANY_SUCCESS,
    DELETE_COMPANY_SUCCESS,
    COMPANY_ERROR,
  } from '../actions/companyAction';
  
  const initialState = {
    companies: [],
    error: null,
  };
  
  const companyReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COMPANIES_SUCCESS:
        return {
          ...state,
          companies: action.payload,
          error: null,
        };
      case ADD_COMPANY_SUCCESS:
        return {
          ...state,
          companies: [...state.companies, action.payload],
          error: null,
        };
      case EDIT_COMPANY_SUCCESS:
        return {
          ...state,
          companies: state.companies.map((company) =>
            company.id === action.payload.companyId ? action.payload.updatedCompany : company
          ),
          error: null,
        };
      case DELETE_COMPANY_SUCCESS:
        return {
          ...state,
          companies: state.companies.filter((company) => company.id !== action.payload),
          error: null,
        };
      case COMPANY_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default companyReducer;
  