import { SIGNUP_SUCCESS, LOGIN_SUCCESS, FORGOT_PASSWORD_SUCCESS, AUTH_ERROR } from '../actions/authActions';

const initialState = {
    user: null,
    token: null,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token); // Store JWT token in local storage
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                error: null
            };
        case FORGOT_PASSWORD_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                error: null 
            };
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload 
            };
        default:
            return state;
    }
};

export default authReducer;
