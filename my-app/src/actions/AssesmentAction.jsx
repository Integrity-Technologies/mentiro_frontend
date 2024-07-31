import axios from "axios";
import { getToken } from "../actions/authActions"; // Import getToken function from authActions


export const GET_ALL_ASSESSMENTS_SUCCESS = "GET_ALL_ASSESSMENTS_SUCCESS";
export const ADD_ASSESSMENT_SUCCESS = "ADD_ASSESSMENT_SUCCESS";
export const EDIT_ASSESSMENT_SUCCESS = "EDIT_ASSESSMENT_SUCCESS";
export const DELETE_ASSESSMENT_SUCCESS = "DELETE_ASSESSMENT_SUCCESS";
export const ASSESSMENT_ERROR = "ASSESSMENT_ERROR";
export const INVITE_ASSESSMENT_SUCCESS = "INVITE_ASSESSMENT_SUCCESS";
export const GET_WORK_ARRANGEMENTS_SUCCESS = "GET_WORK_ARRANGEMENTS_SUCCESS";
export const GET_ALL_JOB_LOCATION_SUCCESS = "GET_ALL_JOB_LOCATION_SUCCESS";
export const GET_ALL_JOB_ROLE_SUCCESS = "GET_ALL_JOB_ROLE_SUCCESS";


export const getAllAssessments = () => async (dispatch) => {
    try {
      const token = getToken(); // Retrieve token from local storage
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}` // Set authorization header
        }
      };
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Assessments/my/assessments`, axiosConfig);
      // console.log(res, token);
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
    // console.log(assessmentData);
    try {
      const token = getToken();
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/Assessments/create/assessment`,
        assessmentData,
        axiosConfig
      );
      // console.log(res.data + "assessment action");
  
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
      `${process.env.REACT_APP_API_URL}/Assessments/assessment/${assessmentId}`,
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
      `${process.env.REACT_APP_API_URL}/Assessments/assessment/${assessmentId}` , axiosConfig
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
    // console.log(assessmentData);
    try {
      const token = getToken();
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/Assessments/invite/candidate`,
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




export const getAssessmentByUniqueLink = (assessmentData) => async (dispatch) => {
  try {
   
    // console.log(assessmentData);

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Assessments/assessment/${assessmentData}`,
          );

    // Save the response data to local storage
    dispatch({
      type: INVITE_ASSESSMENT_SUCCESS,
      payload: res.data,
    });

    return res.data; // Return the data to be used in the component
  } catch (error) {
    console.error('Error fetching assessment data:', error);
    // Handle error or dispatch error action
  }
};



export const getAllworkArrangement = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/workArrangement/`);
    dispatch({
      type: GET_WORK_ARRANGEMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: error?.response?.data?.error,
    });
  }
};


export const getAlljobLocation = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/jobLocation/`);
    dispatch({
      type: GET_ALL_JOB_LOCATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: error?.response?.data?.error,
    });
  }
};

export const getAlljobRole = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/jobRole/`);
    dispatch({
      type: GET_ALL_JOB_ROLE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ASSESSMENT_ERROR,
      payload: error?.response?.data?.error,
    });
  }
};
