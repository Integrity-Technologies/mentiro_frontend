import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Questions = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  // Function to handle checkbox selection
  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // Function to handle clicking the "Next" button
  const handleNext = () => {
    // Implement logic to proceed to the next question
    console.log("Selected Options:", selectedOptions);
    // Reset selected options for the next question
    setSelectedOptions([]);
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="p-4 w-50">
        <h2 className="mb-4">{questions[currentQuestionIndex].question}</h2>
        <Form>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index} className="mb-2">
              <Form.Check
                type="checkbox"
                id={`option${index}`}
                label={option}
                checked={selectedOptions.includes(`option${index}`)}
                onChange={() => handleOptionSelect(`option${index}`)}
              />
            </div>
          ))}
        </Form>
        {currentQuestionIndex < questions.length - 1 ? (
          <Button variant="dark" onClick={handleNext}>Next</Button>
        ) : (
          <Button variant="dark">Next</Button>
        )}
      </Card>
    </Container>
  );
};

export default Questions;
