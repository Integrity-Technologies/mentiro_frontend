import { GET_QUESTIONS ,
 ADD_QUESTION ,
 DELETE_QUESTION ,
 EDIT_QUESTION 
} from "../actions/QuestionAction"


const initialState = {
  questions: []
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload]
      };
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(question => question.id !== action.payload)
      };
    case EDIT_QUESTION:
      return {
        ...state,
        questions: state.questions.map(question => {
          if (question.id === action.payload.id) {
            return action.payload.updatedQuestion;
          }
          return question;
        })
      };
    default:
      return state;
  }
};

export default questionReducer;
