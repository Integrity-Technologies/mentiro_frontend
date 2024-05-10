import axios from "axios";
import { getToken } from "../actions/authActions"; // Import getToken function from authActions


export const GET_ALL_ASSESSMENTS_SUCCESS = "GET_ALL_ASSESSMENTS_SUCCESS";
export const ADD_ASSESSMENT_SUCCESS = "ADD_ASSESSMENT_SUCCESS";
export const EDIT_ASSESSMENT_SUCCESS = "EDIT_ASSESSMENT_SUCCESS";
export const DELETE_ASSESSMENT_SUCCESS = "DELETE_ASSESSMENT_SUCCESS";
export const ASSESSMENT_ERROR = "ASSESSMENT_ERROR";

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
    try {
      const token = getToken();
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const res = await axios.post(
        "http://localhost:5000/api/Assessments/create/assessment",
        assessmentData,
        axiosConfig
      );
      dispatch({
        type: ADD_ASSESSMENT_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ASSESSMENT_ERROR,
        payload: error.response.data.error,
      });
    }
  };
  

export const editAssessment = (assessmentId, assessmentData) => async (
  dispatch
) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/Assessments/assessment/${assessmentId}`,
      assessmentData
    );
    dispatch({
      type: EDIT_ASSESSMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: error.response.data.error,
    });
  }
};

export const deleteAssessment = (assessmentId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/Assessments/assessment/${assessmentId}`
    );
    dispatch({
      type: DELETE_ASSESSMENT_SUCCESS,
      payload: assessmentId,
    });
  } catch (error) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: error.response.data.error,
    });
  }
};