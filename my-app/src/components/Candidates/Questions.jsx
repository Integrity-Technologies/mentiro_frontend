import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { getQuestionById } from '../../actions/QuestionAction';
import { submitAnswer } from '../../actions/resultAction';

const Questions = ({ onComplete }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerError, setAnswerError] = useState(false); // State variable for validation

  const dispatch = useDispatch();
  const questions = JSON.parse(localStorage.getItem('questions')) || [];

  useEffect(() => {
    const fetchQuestionData = async (questionId) => {
      const data = await dispatch(getQuestionById(questionId));
      setCurrentQuestion(data);
    };

    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      fetchQuestionData(questions[currentQuestionIndex].question_id);
    }
  }, [dispatch, currentQuestionIndex, questions]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAnswerError(false); // Reset answer error when an option is selected
  };

  const resultId = JSON.parse(localStorage.getItem('resultId'));

  const handleNext = () => {
    if (selectedOption !== null) {
      const resultData = {
        resultId: resultId,
        question_id: currentQuestion.id,
        option: selectedOption.option_text
      };
      dispatch(submitAnswer(resultData));
    } else {
      setAnswerError(true); // Set answer error if no option is selected
      return; // Don't proceed if answer is not selected
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      onComplete(); // Call onComplete when the test is completed
    }
  };

  const handleSkip = () => {
    // Don't submit an answer if skipping
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setAnswerError(false); // Reset the error state when skipping
    } else {
      onComplete(); // Call onComplete when the test is completed
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', width: '150vh' }}>
      <Card className="p-4 w-75 shadow-lg rounded-lg">
        {currentQuestion && (
          <>
            <h2 className="mb-4">{currentQuestion.question_text}</h2>
            <Form>
              {currentQuestion.options && currentQuestion.options.map((option, index) => (
                <div key={index} className="mb-2">
                  <Form.Check
                    type="radio"
                    name="options"
                    id={`option${index}`}
                    label={option.option_text}
                    checked={selectedOption && selectedOption.option_text === option.option_text}
                    onChange={() => handleOptionSelect(option)}
                  />
                </div>
              ))}
            </Form>
            {answerError && <p className="text-danger">Please select an answer!</p>} {/* Display error message */}
            <div className="d-flex justify-content-between mt-4">
              <Button variant="outline-dark" onClick={handleSkip}>Skip</Button>
              <Button variant="dark" className='w-25' onClick={handleNext}>Next</Button>
            </div>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Questions;
