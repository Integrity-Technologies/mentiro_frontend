// companyAction.jsx
import axios from "axios";

export const FETCH_COMPANIES_SUCCESS = "FETCH_COMPANIES_SUCCESS";
export const ADD_COMPANY_SUCCESS = "ADD_COMPANY_SUCCESS";
export const EDIT_COMPANY_SUCCESS = "EDIT_COMPANY_SUCCESS";
export const DELETE_COMPANY_SUCCESS = "DELETE_COMPANY_SUCCESS";
export const COMPANY_ERROR = "COMPANY_ERROR";

export const fetchCompaniesSuccess = (companies) => ({
  type: FETCH_COMPANIES_SUCCESS,
  payload: companies,
});

export const addCompanySuccess = (company) => ({
  type: ADD_COMPANY_SUCCESS,
  payload: company,
});

export const editCompanySuccess = (companyId, updatedCompany) => ({
  type: EDIT_COMPANY_SUCCESS,
  payload: { companyId, updatedCompany },
});

export const deleteCompanySuccess = (companyId) => ({
  type: DELETE_COMPANY_SUCCESS,
  payload: companyId,
});

export const companyError = (error) => ({
  type: COMPANY_ERROR,
  payload: error,
});

// Async action creator for fetching companies
export const fetchCompanies = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/company/AllCompany"
    );
    dispatch(fetchCompaniesSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    dispatch(companyError(error.message));
  }
};
