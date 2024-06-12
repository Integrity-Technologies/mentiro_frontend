import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { getQuestionById } from '../../actions/QuestionAction';
import { submitAnswer } from '../../actions/resultAction';

const Questions = ({ onComplete }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerError, setAnswerError] = useState(false); // State variable for validation
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60); // Initialize with 60 seconds for each question

  const dispatch = useDispatch();
  const questions = JSON.parse(localStorage.getItem('questions')) || [];
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchQuestionData = async (questionId) => {
      const data = await dispatch(getQuestionById(questionId));
      setCurrentQuestion(data);
    };

    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      fetchQuestionData(questions[currentQuestionIndex].question_id);
    }
  }, [dispatch, currentQuestionIndex, questions]);

  useEffect(() => {
    // Calculate progress percentage
    const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    setProgressPercentage(percentage);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    // Start the timer for each question
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimeRemaining(60); // Reset timer for each question

    timerRef.current = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          handleSkip(); // Skip the question if time runs out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex]);

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
      <div className="d-flex justify-content-between align-items-center" style={{ width: '50%' }}>
        <div className="progress" style={{ width: '80%' }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progressPercentage}%` }}
            aria-valuenow={progressPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <div className="ml-2">
          {currentQuestionIndex + 1}/{questions.length}
        </div>
      </div>
      <Card className="p-4 w-75 shadow-lg rounded-lg mt-3">
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
            <div className="mt-3 text-center">
              Time remaining: {timeRemaining}s
            </div>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Questions;