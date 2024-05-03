import React, {useState} from "react";
import { Container, Button } from "react-bootstrap";
import Questions from "./Questions";

const TestTime = () => {
    const [showQuestions, setShowQuestion] = useState(false);

  const handleSubmitButtonClick = () => {
    setShowQuestion(true);
}
  return (
    <div>
        {showQuestions ? (
        <Questions />
      ) : (
        <div>
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center p-3 border">
        <h3>You have 20 minutes to answer 20 questions</h3>
        <p>
          <strong>Test Time:</strong> 20 minutes
        </p>
        <p>
          <strong>Answer 20 Questions</strong>
        </p>
        <p>
          <strong>Instructions:</strong>
        </p>
        <div className="mt-4">
          <Button variant="dark" className="mb-2 w-100" onClick={handleSubmitButtonClick}>
            Start Test
          </Button>
          <br />
          <Button variant="outline-warning" className="w-100 mb-2">
            Back
          </Button>{" "}
        </div>
      </div>
    </Container>
    </div>
      )}
      </div>
  );
};

export default TestTime;
