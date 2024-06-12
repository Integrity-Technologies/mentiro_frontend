import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Preview from "./Preview"; // Import the Preview component
import { getQuestions } from "../../actions/QuestionAction"; // Adjust the path as per your project structure

const Question = ({ handleBackButtonClick }) => {
  const dispatch = useDispatch(); // Initialize dispatch

  const [showPreview, setShowPreview] = useState(false); // State to manage preview visibility

  const questions = useSelector((state) => state.question.questions);
  // console.log("🚀 ~ Question ~ questions:", questions)

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]); 

  // Function to handle preview button click
  const handlePreviewButtonClick = () => {
    setShowPreview(true);
  };

  // const questionType = "MCQs"; // Question type
  // const difficultyLevel = "Medium"; // Difficulty level
  // const categoryName = "DR"; // Category name

  return (
    <div>
      {showPreview ? (
        <Preview
          handleBackButtonClick={() => setShowPreview(false)}
          // Pass necessary data to the Preview component if needed
        />
      ) : (
        <>
          {/* Card for question */}
          <h2 className="text-center mb-4">Question</h2>

          {/* <Row className="justify-content-center align-items-center">
            <Col md={6}>
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
                </Card.Body>
              </Card>
            </Col>
          </Row> */}

          {questions.map((question, index) => (
            <Row
              className="justify-content-center align-items-center"
              key={index}
            >
              <Col md={6}>
                <Card style={{ width: "18rem" }} className="mb-3">
                  <Card.Body>
                    <Card.Title>Question {question.id}</Card.Title>
                    <Card.Text>
                      Question: {question.question_text}
                      <br />
                      Question Type: {question.question_type}
                      <br />
                      Difficulty Level: {question.difficulty_level}
                      <br />
                      Category Name: {question.categories.join(", ")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}

          {/* Preview Button */}
          <div className="text-center mb-3">
            <Button variant="primary" onClick={handlePreviewButtonClick}>
              Preview
            </Button>
          </div>

          {/* Back Button */}
          <div className="text-center mt-4">
            <Button
              variant="outline-primary"
              size="lg"
              onClick={handleBackButtonClick}
            >
              Back
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Question;