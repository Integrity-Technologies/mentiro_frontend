import axios from "axios";

export const FETCH_CANDIDATES_SUCCESS = "FETCH_CANDIDATES_SUCCESS";
export const ADD_CANDIDATE_SUCCESS = "ADD_CANDIDATE_SUCCESS";
export const EDIT_CANDIDATE_SUCCESS = "EDIT_CANDIDATE_SUCCESS";
export const DELETE_CANDIDATE_SUCCESS = "DELETE_CANDIDATE_SUCCESS";
export const CANDIDATE_ERROR = "CANDIDATE_ERROR";

export const getAllCandidates = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/candidate/allCandidate");
    console.log(res);

    const formattedUsers = res.data.map((user) => ({
        ...user,
        created_at: user.created_at.split("T")[0], // Extract date part only
      }));

    dispatch({ type: FETCH_CANDIDATES_SUCCESS, payload: formattedUsers });
    
    return formattedUsers;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Error fetching candidates";
    dispatch({ type: CANDIDATE_ERROR, payload: errorMessage });
    throw error;
  }
};

export const addCandidate = (newCandidate) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/api/candidate/create", newCandidate);
    const data = response.data;
    dispatch({ type: ADD_CANDIDATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error adding candidate:", error);
    dispatch({ type: CANDIDATE_ERROR, payload: error.message });
    return null;
  }
};

export const editCandidate = (candidateId, updatedCandidate) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/candidate/edit/${candidateId}`, updatedCandidate);
    const data = response.data;
    dispatch({ type: EDIT_CANDIDATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error editing candidate:", error);
    dispatch({ type: CANDIDATE_ERROR, payload: error.message });
    return null;
  }
};

export const deleteCandidate = (candidateId) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/candidate/delete/${candidateId}`);
    console.log(candidateId);
    const data = response.data;
    dispatch({ type: DELETE_CANDIDATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error deleting candidate:", error);
    dispatch({ type: CANDIDATE_ERROR, payload: error.message });
    return null;
  }
};
