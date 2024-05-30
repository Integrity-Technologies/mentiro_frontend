import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { getQuestionById } from '../../actions/QuestionAction'; // Adjust the import according to your file structure
import { submitAnswer } from '../../actions/resultAction'; // Adjust the import according to your file structure

const Questions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const dispatch = useDispatch();
  const questions = useSelector((state) => state.question.questions);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getQuestionById(1)); // Fetch question with ID 1 or adjust ID as needed
    };
    fetchData();
  }, [dispatch]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const result_id = JSON.parse(localStorage.getItem('resultId'));

  const handleNext = () => {
    if (selectedOption !== null) {
      // Prepare result data
      const resultData = {
        resultId: result_id,
        question_id: questions.id,
        option: selectedOption.option_text // Adjust as needed to match your API expectations
      };

      // Dispatch the submitAnswer action
      dispatch(submitAnswer(resultData));
    }
    setShowThankYou(true);
  };

  const handleSkip = () => {
    setShowThankYou(true);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', width: '150vh' }}>
      <Card className="p-4 w-50">
        {!showThankYou ? (
          questions && (
            <>
              <h2 className="mb-4">{questions.question_text}</h2>
              <Form>
                {questions.options && questions.options.map((option, index) => (
                  <div key={index} className="mb-2">
                    <Form.Check
                      type="radio"
                      name="options"
                      id={`option${index}`}
                      label={option.option_text}
                      checked={selectedOption && selectedOption.option_text === option.option_text} // Adjust comparison as needed
                      onChange={() => handleOptionSelect(option)} // Store the entire option object or its identifier
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
          <h2>Thank you!</h2>
        )}
      </Card>
    </Container>
  );
};

export default Questions;
