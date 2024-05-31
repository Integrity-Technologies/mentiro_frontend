import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { getQuestionById } from '../../actions/QuestionAction';
import { submitAnswer } from '../../actions/resultAction';

const Questions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

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
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowThankYou(true);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowThankYou(true);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', width: '150vh' }}>
      <Card className="p-4 w-50">
        {!showThankYou ? (
          currentQuestion && (
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
              <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-dark" onClick={handleSkip}>Skip</Button>
                <Button variant="dark" className='w-25' onClick={handleNext}>Next</Button>
              </div>
            </>
          )
        ) : (
          <h2 className="text-center mt-2 text-green">Thank you!</h2>
        )}
      </Card>
    </Container>
  );
};

export default Questions;
