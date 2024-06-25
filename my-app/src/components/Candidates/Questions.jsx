import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { getQuestionById } from '../../actions/QuestionAction';
import { submitAnswer } from '../../actions/resultAction';
import { BiTimeFive } from 'react-icons/bi'; // Import clock icon
import PreviewPage from './PreviewQuestions';

const Questions = ({ onComplete }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerError, setAnswerError] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(parseInt(localStorage.getItem('total_time')) * 60);
  const [skippedQuestionIndexes, setSkippedQuestionIndexes] = useState([]);
  const [attemptedQuestionIndexes, setAttemptedQuestionIndexes] = useState([]);
  const [reviewingSkipped, setReviewingSkipped] = useState(false);
  const [showPreviewPage, setShowPreviewPage] = useState(false);
  const [questionCache, setQuestionCache] = useState({});

  const dispatch = useDispatch();
  const questions = JSON.parse(localStorage.getItem('questions')) || [];
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchQuestionData = async (questionId) => {
      if (questionCache[questionId]) {
        setCurrentQuestion(questionCache[questionId]);
      } else {
        try {
          const data = await dispatch(getQuestionById(questionId));
          setQuestionCache((prevCache) => ({ ...prevCache, [questionId]: data }));
          setCurrentQuestion(data);
        } catch (error) {
          console.error('Failed to fetch question data:', error);
        }
      }
    };

    const questionList = reviewingSkipped ? skippedQuestionIndexes.map(index => questions[index]) : questions;
    if (questionList.length > 0 && currentQuestionIndex < questionList.length) {
      fetchQuestionData(questionList[currentQuestionIndex].question_id);
    }
  }, [dispatch, currentQuestionIndex, questions, skippedQuestionIndexes, reviewingSkipped, questionCache]);

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
  }, [onComplete]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAnswerError(false);
  };

  const resultId = JSON.parse(localStorage.getItem('resultId'));

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

  const handleNext = () => {
    if (selectedOption !== null) {
      const resultData = {
        resultId: resultId,
        question_id: currentQuestion.id,
        option: selectedOption.option_text,
      };
      dispatch(submitAnswer(resultData));
      if (!attemptedQuestionIndexes.includes(currentQuestionIndex)) {
        setAttemptedQuestionIndexes((prevAttempted) => [...prevAttempted, currentQuestionIndex]);
      }

      if (reviewingSkipped) {
        setSkippedQuestionIndexes((prevSkipped) => prevSkipped.filter(index => index !== currentQuestionIndex));
      }
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

  const handleEndOfQuestions = () => {
    setShowPreviewPage(true);
  };

  const handleReviewSkipped = () => {
    setReviewingSkipped(true);
    // Ensure skippedQuestionIndexes are correctly updated
    setSkippedQuestionIndexes(
      questions.reduce((acc, _, index) => {
        if (!attemptedQuestionIndexes.includes(index)) {
          acc.push(index);
        }
        return acc;
      }, [])
    );
    setCurrentQuestionIndex(0); // Start reviewing from the first skipped question
    setShowPreviewPage(false); // Close the preview page after choosing to review
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
    <Container fluid className="flex flex-col justify-center items-center">
      {showPreviewPage ? (
        <PreviewPage
          attemptedCount={attemptedQuestionIndexes.length}
          skippedCount={skippedQuestionIndexes.length}
          onSubmit={onComplete}
          onReviewSkipped={handleReviewSkipped}
        />
      ) : (
        <>
         <div className="flex">
              <BiTimeFive className="text-xl mr-2" /> {/* Clock icon */}
              <div className={`mr-2 ${timerStyle}`}>Time remaining: {formatTime(timeRemaining)}</div>
            </div>
          <div className="flex justify-between items-center w-full">
         
            {renderProgressBalls()}
            <div className="ml-2">
              {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>
          <Card className="p-6 shadow-lg rounded-lg mt-3 bg-white" style={{ width: '900px', overflowY: 'auto' }}>
            {currentQuestion && (
              <>
                <h2 className="mb-4">{currentQuestion.question_text}</h2>
                <Form>
                  {currentQuestion.options &&
                    currentQuestion.options.map((option, index) =>
                      option.option_text ? (
                        <div key={index} className="mb-2">
                          <Form.Check
                            type="radio"
                            name="options"
                            id={`option${index}`}
                            label={option.option_text}
                            checked={
                              selectedOption &&
                              selectedOption.option_text === option.option_text
                            }
                            onChange={() => handleOptionSelect(option)}
                          />
                        </div>
                      ) : null
                    )}
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
              </>
            )}
          </Card>
        </>
      )}
    </Container>
  );
};

export default Questions;
