import axios from "axios";
import { getToken } from "../actions/authActions"; // Import getToken function from authActions


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
  } catch (error) {
    dispatch(companyError(error.message));
  }
};

// Async action creator for adding a company
export const addCompany = (companyData) => async (dispatch) => {
  try {
    const token = getToken(); // Retrieve token from local storage
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}` // Set authorization header
      }
    };
    console.log(token);

    const response = await axios.post(
      "http://localhost:5000/api/company/create/company",
      companyData, axiosConfig
    );
    dispatch(addCompanySuccess(response.data));
  } catch (error) {
    dispatch(companyError(error.message));
  }
};

// Async action creator for editing a company
export const editCompany = (companyId, updatedCompanyData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/company/update/company/${companyId}`,
      updatedCompanyData
    );
    dispatch(editCompanySuccess(companyId, response.data));
  } catch (error) {
    dispatch(companyError(error.message));
  }
};

// Async action creator for deleting a company
export const deleteCompany = (companyId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/company/delete/company/${companyId}`);
    dispatch(deleteCompanySuccess(companyId));
  } catch (error) {
    dispatch(companyError(error.message));
  }
};
