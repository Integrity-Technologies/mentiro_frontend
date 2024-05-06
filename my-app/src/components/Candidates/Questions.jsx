import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Questions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  // Array of questions and options
  const questions = [
    {
      question: "What is SEO?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
    {
      question: "What is HTML?",
      options: ["text language", "hyper language", "Hyper Text Markup Language", "option 4"]
    }
    // Add more questions here as needed
  ];

  // Function to handle radio option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Function to handle clicking the "Next" button
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // If it's not the last question, proceed to the next question
      console.log("Selected Option:", selectedOption);
      // Reset selected option for the next question
      setSelectedOption(null);
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // If it's the last question, show the "Thank you" message
      setShowThankYou(true);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="p-4 w-50">
        {!showThankYou ? (
          <>
            <h2 className="mb-4">{questions[currentQuestionIndex].question}</h2>
            <Form>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="mb-2">
                  <Form.Check
                    type="radio"
                    name="options"
                    id={`option${index}`}
                    label={option}
                    checked={selectedOption === `option${index}`}
                    onChange={() => handleOptionSelect(`option${index}`)}
                  />
                </div>
              ))}
            </Form>
            <Button variant="dark" onClick={handleNext}>Next</Button>
            <br />
            <Button variant="dark">Skip</Button>
          </>
        ) : (
          <h2>Thank you!</h2>
        )}
      </Card>
    </Container>
  );
};

export default Questions;
