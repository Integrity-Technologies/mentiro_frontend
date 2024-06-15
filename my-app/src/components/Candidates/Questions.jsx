import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Button, Modal } from 'react-bootstrap';
import { getQuestionById } from '../../actions/QuestionAction';
import { submitAnswer } from '../../actions/resultAction';

const Questions = ({ onComplete }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerError, setAnswerError] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(parseInt(localStorage.getItem('total_time')) * 60);
  const [skippedQuestionIndexes, setSkippedQuestionIndexes] = useState([]);
  const [attemptedQuestionIndexes, setAttemptedQuestionIndexes] = useState([]);
  const [reviewingSkipped, setReviewingSkipped] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  const dispatch = useDispatch();
  const questions = JSON.parse(localStorage.getItem('questions')) || [];
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchQuestionData = async (questionId) => {
      const data = await dispatch(getQuestionById(questionId));
      setCurrentQuestion(data);
    };

    const questionList = reviewingSkipped ? skippedQuestionIndexes.map(index => questions[index]) : questions;
    if (questionList.length > 0 && currentQuestionIndex < questionList.length) {
      fetchQuestionData(questionList[currentQuestionIndex].question_id);
    }
  }, [dispatch, currentQuestionIndex, questions, skippedQuestionIndexes, reviewingSkipped]);

  useEffect(() => {
    const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    setProgressPercentage(percentage);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          onComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);


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
        option: selectedOption.option_text,
      };
      dispatch(submitAnswer(resultData));
      setAttemptedQuestionIndexes((prevAttempted) => [...prevAttempted, currentQuestionIndex]);
    } else {
      setAnswerError(true);
      return;
    }

    const questionList = reviewingSkipped ? skippedQuestionIndexes.map(index => questions[index]) : questions;
    if (currentQuestionIndex + 1 < questionList.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      handleEndOfQuestions();
    }
  };

  const handleSkip = () => {
    setSkippedQuestionIndexes((prevSkipped) => [...prevSkipped, currentQuestionIndex]);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setAnswerError(false);
    } else {
      handleEndOfQuestions();
    }
  };

  const handleEndOfQuestions = () => {
    if (skippedQuestionIndexes.length > 0 && !reviewingSkipped) {
      setShowEndModal(true);
    } else {
      onComplete();
    }
  };

  const handleReviewSkipped = () => {
    setReviewingSkipped(true);
    setCurrentQuestionIndex(0);
    setShowEndModal(false);
  };

  const handleBallClick = (index) => {
    if (index !== currentQuestionIndex) {
      setCurrentQuestionIndex(index);
      setSelectedOption(null);
      setAnswerError(false);
    }
  };

  const renderProgressBalls = () => {
    return (
      <div className="flex justify-center items-center">
        {questions.map((_, index) => {
          let ballColor = 'bg-gray-300';
          if (attemptedQuestionIndexes.includes(index)) {
            ballColor = 'bg-green-500';
          } else if (skippedQuestionIndexes.includes(index)) {
            ballColor = 'bg-gray-500';
          }

          return (
            <React.Fragment key={index}>
              <div
                className={`w-5 h-5 rounded-full ${ballColor} cursor-pointer`}
                onClick={() => handleBallClick(index)}
              />
              {index < questions.length - 1 && <div className="w-4 h-1 bg-gray-400 mx-1" />}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const timerStyle = timeRemaining <= 120 ? 'text-red-500' : 'text-black';
  

  return (
    <Container fluid className="flex flex-col justify-center items-center ">
      <div className="flex justify-between items-center w-full">
        {renderProgressBalls()}
        <div className="ml-2">
          {currentQuestionIndex + 1}/{reviewingSkipped ? skippedQuestionIndexes.length : questions.length}
        </div>
      </div>
      <Card className="p-6 shadow-lg rounded-lg mt-3 bg-white" style={{  width: '600px', overflowY: 'auto' }}>
        {currentQuestion && (
          <>
            <h2 className="mb-4">{currentQuestion.question_text}</h2>
            <Form>
              {currentQuestion.options &&
                currentQuestion.options.map((option, index) => (
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
              <Button variant="outline-dark" onClick={handleSkip}>
                Skip
              </Button>
              <Button variant="dark" className="w-1/4" onClick={handleNext}>
                Next
              </Button>
            </div>
            <div className={`mt-3 text-center ${timerStyle}`}>Time remaining: {formatTime(timeRemaining)}</div>          </>
        )}
      </Card>

      <Modal show={showEndModal} onHide={() => setShowEndModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>End of Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have skipped some questions. Do you want to review them or submit the results?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onComplete()}>
            Submit
          </Button>
          <Button variant="primary" onClick={handleReviewSkipped}>
            Review Skipped Questions
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Questions;