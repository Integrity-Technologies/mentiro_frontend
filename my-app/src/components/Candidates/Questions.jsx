import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { getQuestionById } from '../../actions/QuestionAction'; // Adjust the import according to your file structure

const Questions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

  const handleNext = () => {
    console.log('Selected Option:', selectedOption);
    setShowThankYou(true);
  };

  const handleSkip = () => {
    setShowThankYou(true);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', width: '150vh' }}>
      <Card className="p-4 w-50">
        {!showThankYou ? (
          Questions && (
            <>
              <h2 className="mb-4">{questions.question_text}</h2>
              <Form>
                {questions.options.map((option, index) => (
                  <div key={index} className="mb-2">
                    <Form.Check
                      type="radio"
                      name="options"
                      id={`option${index}`}
                      label={option.option_text}
                      checked={selectedOption === `option${index}`}
                      onChange={() => handleOptionSelect(`option${index}`)}
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
