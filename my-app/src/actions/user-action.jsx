import axios from 'axios';
import { updateField, resetForm } from '../reducers/signUpReducer';

// Action to submit signup data
export const submitSignUp = (formData) => async (dispatch) => {
  try {
    const response = await axios.post('url', formData);
    console.log('Signup Successful', response.data);
    dispatch(resetForm());
  } catch (error) {
    console.error('Signup Failed', error);
  }
};

