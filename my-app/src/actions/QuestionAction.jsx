import axios from 'axios';
import { getToken } from "../actions/authActions"; // Import getToken function from authActions


export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const EDIT_QUESTION = 'EDIT_QUESTION';
export const ALL_QUESTION = 'ALL_QUESTION';



// Action to fetch all questions from the API
export const getQuestions = () => async (dispatch) => {
  try {
    
    const res = await axios.get('http://localhost:5000/api/question/AllQuestion'); // Adjust the endpoint according to your API
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data
    });
  } catch (error) {
    // Handle error if any
    console.error(error);
  }
};

// Action to add a new question
export const addQuestion = (newQuestion) => async (dispatch) => {
    try {
        console.log(newQuestion);
        const token = getToken();
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      // Make an API request to add the new question
      const res = await axios.post('http://localhost:5000/api/question/create/question', newQuestion, axiosConfig); // Adjust the endpoint according to your API
      dispatch({
        type: ADD_QUESTION,
        payload: res.data // Assuming the response contains the newly added question
      });
    } catch (error) {
      // Handle error if any
      console.error(error);
    }
  };
  
  // Action to delete a question
//   export const deleteQuestion = (questionId) => async (dispatch) => {
//     try {
//         console.log(questionId);
//       // Make an API request to delete the question
//       await axios.delete(`http://localhost:5000/api/question/delete/${questionId}`); // Adjust the endpoint according to your API
//       dispatch({
//         type: DELETE_QUESTION,
//         payload: questionId // Send the deleted question's ID to the reducer
//       });
//     } catch (error) {
//       // Handle error if any
//       console.error(error);
//     }
//   };

export const deleteQuestion = (Id) => async (dispatch) => {
    try {
        console.log(Id);
      const token = getToken();
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      const res = await axios.delete(`http://localhost:5000/api/question/delete/${Id}`, axiosConfig);
      // Check if deletion was successful (status code 2xx)
      if (res.status >= 200 && res.status < 300) {
        dispatch({ type: DELETE_QUESTION, payload: Id });
      } else {
        // Handle unexpected status codes (optional)
        console.error('Unexpected status code:', res.status);
      }
      return res.data;
    } catch (error) {
      const errorMessage = JSON.stringify(error.response.data.error);
      console.log(errorMessage);
      throw error;
    }
  };
  
  
  // Action to edit a question
  export const editQuestion = (Id, updatedQuestion) => async (dispatch) => {
    try {
        const token = getToken();
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        console.log(updatedQuestion);

      // Make an API request to update the question
      const res = await axios.put(`http://localhost:5000/api/question/update/${Id}`, updatedQuestion, axiosConfig); // Adjust the endpoint according to your API
      dispatch({
        type: EDIT_QUESTION,
        payload: { Id, updatedQuestion: res.data } // Send the updated question object to the reducer
      });
    } catch (error) {
      // Handle error if any
      console.error(error);
    }
  };
  

  export const getQuestionById = (id) => async (dispatch) => {
    try {
      const token = getToken();
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const res = await axios.get(`http://localhost:5000/api/question/${id}`, axiosConfig);
      dispatch({
        type: ALL_QUESTION,
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      // Optionally dispatch an error action here
    }
  };