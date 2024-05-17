import axios from "axios";
import { getToken } from "../actions/authActions"; // Import getToken function from authActions


export const GET_ALL_ASSESSMENTS_SUCCESS = "GET_ALL_ASSESSMENTS_SUCCESS";
export const ADD_ASSESSMENT_SUCCESS = "ADD_ASSESSMENT_SUCCESS";
export const EDIT_ASSESSMENT_SUCCESS = "EDIT_ASSESSMENT_SUCCESS";
export const DELETE_ASSESSMENT_SUCCESS = "DELETE_ASSESSMENT_SUCCESS";
export const ASSESSMENT_ERROR = "ASSESSMENT_ERROR";
export const INVITE_ASSESSMENT_SUCCESS = "INVITE_ASSESSMENT_SUCCESS";

export const getAllAssessments = () => async (dispatch) => {
    try {
      const token = getToken(); // Retrieve token from local storage
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}` // Set authorization header
        }
      };
      const res = await axios.get("http://localhost:5000/api/Assessments/my/assessments", axiosConfig);
      console.log(res, token);
      dispatch({
        type: GET_ALL_ASSESSMENTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ASSESSMENT_ERROR,
        payload: error.response.data.error,
      });
    }
  };

  export const addAssessmentWithTests = (assessmentData) => async (dispatch) => {
    console.log(assessmentData);
    try {
      const token = getToken();
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/Assessments/create/assessment",
        assessmentData,
        axiosConfig
      );
      console.log(res.data + "assessment action");
  
      // Save the response data to local storage
      if (res.data && res.data.assessment) {
        localStorage.setItem("assessmentResponse", JSON.stringify(res.data.assessment));
      }
  
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
      return res.data; // Return the data to be used in the component
  
    } catch (error) {
      dispatch({
        type: ASSESSMENT_ERROR,
      });
    }
  };
  

export const editAssessment = (assessmentId, assessmentData) => async (
  dispatch
) => {
  try {
    const token = getToken();
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const res = await axios.put(
      `http://localhost:5000/api/Assessments/assessment/${assessmentId}`,
      assessmentData, axiosConfig
    );
    dispatch({
      type: EDIT_ASSESSMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: error?.response?.data?.error,
    });
  }
};

export const deleteAssessment = (assessmentId) => async (dispatch) => {
  try {
    const token = getToken();
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

    await axios.delete(
      `http://localhost:5000/api/Assessments/assessment/${assessmentId}` , axiosConfig
    );
    dispatch({
      type: DELETE_ASSESSMENT_SUCCESS,
      payload: assessmentId,
    });
  } catch (error) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: error?.response?.data?.error,
    });
  }
};

export const InviteAssessment = (assessmentData) => async (dispatch) => {
    console.log(assessmentData);
    try {
      const token = getToken();
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        "http://localhost:5000/api/Assessments/invite/candidate",
        assessmentData,
        axiosConfig
      );
  
      // Save the response data to local storage
      
      dispatch({
        type: INVITE_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
      return res.data; // Return the data to be used in the component
  
    } catch (error) {
      dispatch({
        type: ASSESSMENT_ERROR,
      });
    }
  };