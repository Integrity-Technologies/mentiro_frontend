import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Question from "./Question";
import { fetchTests } from "../../actions/testAction";
import { addAssessmentWithTests } from "../../actions/AssesmentAction";
const TestSelection = ({ handleBackButtonClick }) => {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.test.tests);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedTests, setSelectedTests] = useState([]); // State to store selected tests
  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);
  const handleNextButtonClick = () => {
    setShowQuestion(true);
    // Retrieve the company name from localStorage
    const companyName = JSON.parse(localStorage.getItem('activeCompany')).name;
    const assessmentNmae = JSON.parse(localStorage.getItem('assessments'))

    // Structure the tests array
    const testsPayload = selectedTests.map(testId => {
      const test = tests.find(t => t.id === testId);
      return {
        test_name: test.test_name,
        test_difficulty: test.difficulty_level
      };
    });
    // Include the company name in the payload
    dispatch(addAssessmentWithTests({
      assessment_name: assessmentNmae,
      tests: testsPayload,
      company_name: companyName
    }));
  };
  // Function to handle test selection
  const handleTestSelection = (testId) => {
    const alreadySelected = selectedTests.includes(testId);
    if (alreadySelected) {
      setSelectedTests(selectedTests.filter((id) => id !== testId));
    } else {
      setSelectedTests([...selectedTests, testId]);
    }
  };
  return (
    <div>
      {showQuestion ? (
        <Question Question={Question} handleBackButtonClick={handleBackButtonClick} />
      ) : (
        <div>
          <h2 className="text-center mb-4">Test Selection</h2>
          <Row className="justify-content-center align-items-center">
            {tests.map((test) => (
              <Col key={test.id} md={4} className="mb-3 ml-md-15">
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Test Review</Card.Title>
                    <Card.Text>
                      Please review the test details before proceeding.
                      <br />
                      Test Name: {test.test_name}
                      <br />
                      Category: SEO
                      <br />
                      Difficulty Level: {test.difficulty_level}
                    </Card.Text>
                    <Button
                      variant={selectedTests.includes(test.id) ? "success" : "primary"}
                      onClick={() => handleTestSelection(test.id)}
                    >
                      {selectedTests.includes(test.id) ? "Selected" : "Add Test"}
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