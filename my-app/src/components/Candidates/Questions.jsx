import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { getQuestionById } from '../../actions/QuestionAction';
import { submitAnswer } from '../../actions/resultAction';

const Questions = ({ onComplete }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerError, setAnswerError] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);

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
    const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    setProgressPercentage(percentage);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimeRemaining(60);

    timerRef.current = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          handleSkip();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAnswerError(false);
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
      setAnswerError(true);
      return;
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setAnswerError(false);
    } else {
      onComplete();
    }
  };

  return (
    <Container className="flex flex-col justify-center items-center min-h-screen w-full">
      <div className="flex justify-between items-center w-80 mb-3">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${index < currentQuestionIndex ? 'bg-green-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
      <Card className="p-4 w-full shadow-lg rounded-lg">
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
            {answerError && <p className="text-red-500">Please select an answer!</p>}
            <div className="flex justify-between mt-4">
              <Button variant="outline-dark" onClick={handleSkip}>Skip</Button>
              <Button variant="dark" className='w-1/4' onClick={handleNext}>Next</Button>
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
