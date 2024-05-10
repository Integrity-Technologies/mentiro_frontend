import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Question from "./Question";
import { fetchTests } from "../../actions/testAction"; // Adjust the path as per your project structure

const TestSelection = ({ handleBackButtonClick }) => {
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    dispatch(fetchTests()); // Dispatch fetchTests action when component mounts
  }, [dispatch]); // Add dispatch as a dependency to avoid lint warnings

  const tests = useSelector((state) => state.test.tests); // Get tests from Redux store

  const [showQuestion, setShowQuestion] = useState(false); // State to manage test selection visibility

  const handleNextButtonClick = () => {
    setShowQuestion(true); // Set showQuestion state to true when "Next" button is clicked
  };

  const categoryName = "SEO"; // Category name
  const testDifficultyLevel = "Medium"; // Test difficulty level

  return (
    <div>
      {showQuestion ? (
        <Question Question={Question} handleBackButtonClick={handleBackButtonClick} />
      ) : (
        <div>
          <h2 className="text-center mb-4">Test Selection</h2>
          <Row className="justify-content-center align-items-center">
            <Col md={4} className="mb-3 ml-md-15">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Test Review</Card.Title>
                  <Card.Text>
                    Please review the test details before proceeding.
                    <br />
                    Test Name: English
                    <br />
                    Category: {categoryName}
                    <br />
                    Difficulty Level: {testDifficultyLevel}
                  </Card.Text>
                  <Button variant="primary" onClick={handleNextButtonClick}>
                    Add Test
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            {/* Additional cards here */}
  {tests && tests.map((test) => (
    <Col key={test.id} md={4} className="mb-3 ml-md-15">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Test Review</Card.Title>
          <Card.Text>
          Please review the test details before proceeding.
          <br />
            Test Name: {test.test_name}
            <br />
            Category: {test.categories}
            <br />
            Difficulty Level: {test.difficulty}
          </Card.Text>
          <Button variant="primary" onClick={handleNextButtonClick}>
            Add Test
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ))}
   </Row>        


          <div className="text-center mt-4">
            <Button variant="outline-primary" size="lg" onClick={handleBackButtonClick}>
              Back
            </Button>{" "}
            <Button variant="outline-success" size="lg" onClick={handleNextButtonClick}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestSelection;
