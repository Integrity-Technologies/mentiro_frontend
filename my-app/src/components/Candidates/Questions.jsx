import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { getQuestionById } from '../../actions/QuestionAction';
import { submitAnswer } from '../../actions/resultAction';
import { BiTimeFive } from 'react-icons/bi';
import PreviewPage from './PreviewQuestions';

const Questions = ({ onComplete, onTimeExpired }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerError, setAnswerError] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(parseInt(localStorage.getItem('total_time')) * 60);
  const [attemptedQuestionIndexes, setAttemptedQuestionIndexes] = useState([]);
  const [skippedQuestionIndexes, setSkippedQuestionIndexes] = useState([]);
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

    const questionList = questions.map(q => q.question_id);
    if (questionList.length > 0 && currentQuestionIndex < questionList.length) {
      fetchQuestionData(questionList[currentQuestionIndex]);
    }
  }, [dispatch, currentQuestionIndex, questions, questionCache]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          onTimeExpired(); // Call onTimeExpired instead of onComplete
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [onTimeExpired]); // Dependency should include onTimeExpired

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
      if (!attemptedQuestionIndexes.includes(currentQuestionIndex)) {
        setAttemptedQuestionIndexes((prevAttempted) => [...prevAttempted, currentQuestionIndex]);
      }

      setSelectedOption(null);
      moveToNextQuestion();
    } else {
      setAnswerError(true);
    }
  };

  const handleSkip = () => {
    if (!skippedQuestionIndexes.includes(currentQuestionIndex)) {
      setSkippedQuestionIndexes((prevSkipped) => [...prevSkipped, currentQuestionIndex]);
    }
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    let nextIndex = currentQuestionIndex + 1;
    while (nextIndex < questions.length && (attemptedQuestionIndexes.includes(nextIndex) || skippedQuestionIndexes.includes(nextIndex))) {
      nextIndex++;
    }
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      handleEndOfQuestions();
    }
  };

  const handleEndOfQuestions = () => {
    if (reviewingSkipped && skippedQuestionIndexes.length > 0) {
      setCurrentQuestionIndex(skippedQuestionIndexes[0]);
      // Reset skipped questions state after revisiting
      setSkippedQuestionIndexes([]);
    } else {
      setShowPreviewPage(true);
    }
  };
  
  const handleReviewSkipped = () => {
    setShowPreviewPage(false);
    setReviewingSkipped(true);
    // Reset skipped questions state when reviewing skipped questions
    setSkippedQuestionIndexes([]);
    if (skippedQuestionIndexes.length > 0) {
      setCurrentQuestionIndex(skippedQuestionIndexes[0]);
      // Reset skipped questions state after revisiting
      setSkippedQuestionIndexes([]);
    } else {
      setShowPreviewPage(true);
    }
  };
  
  const handleBallClick = (index) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(null);
    setAnswerError(false);
  };

  const renderProgressBalls = () => {
    return (
      <div className="flex justify-center items-center">
        {questions.map((_, index) => {
          let ballColor = 'bg-gray-300';
          if (attemptedQuestionIndexes.includes(index)) {
            ballColor = 'bg-green-500';
          } else if (skippedQuestionIndexes.includes(index)) {
            ballColor = 'bg-yellow-500';
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
          <div className="flex mb-4">
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
                  <Button variant="dark" className="w-1/4" onClick={handleSkip}>
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