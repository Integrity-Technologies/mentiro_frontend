import React from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Question = ({ handleBackButtonClick }) => {
  const handleNextButtonClick = () => {
    // Logic for next button click
  };

  const questionType = "MCQs"; // Question type
  const difficultyLevel = "Medium"; // Difficulty level
  const categoryName = "DR"; // Category name

  return (
    <div>
      <h2 className="text-center mb-4">Question</h2>

      {/* First Card */}
      <Row className="justify-content-center align-items-center">
        <Card style={{ width: "18rem" }} className="mb-3">
          <Card.Body>
            <Card.Title>Question 1</Card.Title>
            <Card.Text>
              Question: What is SEO?
              <br />
              Question Type: {questionType}
              <br />
              Difficulty Level: {difficultyLevel}
              <br />
              Category Name: {categoryName}
              <br />
              Options:
              <br />
              - Search Optimization
              <br />
              - Search Engine
              <br />
              - Search Engine Optimization
              <br />- Search Engine
            </Card.Text>
            <Button variant="primary" onClick={handleNextButtonClick}>
              Next
            </Button>
          </Card.Body>
        </Card>

        {/* Second Card */}
        <Card style={{ width: "18rem" }} className="mb-3">
          <Card.Body>
            <Card.Title>Question 2</Card.Title>
            <Card.Text>
              Question: What is HTML?
              <br />
              Question Type: {questionType}
              <br />
              Difficulty Level: {difficultyLevel}
              <br />
              Category Name: {categoryName}
              <br />
              Options:
              <br />
              - Hyper Text Markup Language
              <br />
              - Hypertext Markup Language
              <br />
              - Hyper Text Markup Level
              <br />- Hyper Text Markup Linguistics
            </Card.Text>
            <Button variant="primary" onClick={handleNextButtonClick}>
              Next
            </Button>
          </Card.Body>
        </Card>

        {/* Third Card */}
        <Card style={{ width: "18rem" }} className="mb-3">
          <Card.Body>
            <Card.Title>Question 3</Card.Title>
            <Card.Text>
              Question: What is CSS?
              <br />
              Question Type: {questionType}
              <br />
              Difficulty Level: {difficultyLevel}
              <br />
              Category Name: {categoryName}
              <br />
              Options:
              <br />
              - Cascading Style Sheets
              <br />
              - Creative Style Sheets
              <br />
              - Computer Style Sheets
              <br />- Colorful Style Sheets
            </Card.Text>
            <Button variant="primary" onClick={handleNextButtonClick}>
              Next
            </Button>
          </Card.Body>
        </Card>
      </Row>

      <div className="text-center mt-4">
        <Button
          variant="outline-primary"
          size="lg"
          onClick={handleBackButtonClick}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default Question;
