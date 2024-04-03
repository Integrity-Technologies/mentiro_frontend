import { createSlice } from '@reduxjs/toolkit';
import { submitSignUp } from '../actions/user-action'; 

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  companyName: '',
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const { updateField, resetForm } = signUpSlice.actions;
export default signUpSlice.reducer;

export { submitSignUp };
