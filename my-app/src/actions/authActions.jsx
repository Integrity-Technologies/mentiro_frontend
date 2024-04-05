import axios from 'axios';

// Action types
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

// Action creators
export const signUp = (userData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/signup', userData);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data // Assuming the backend returns user data and JWT token upon successful signup
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.message // Assuming the backend returns error message in case of failure
        });
    }
};



export const login = (userData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/login', userData);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data // Assuming the backend returns user data and JWT token upon successful login
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.message // Assuming the backend returns error message in case of failure
        });
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        const res = await axios.post('/api/forgot-password', { email });
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: res.data // Assuming the backend returns success message upon successful password reset request
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.message // Assuming the backend returns error message in case of failure
        });
    }
};
