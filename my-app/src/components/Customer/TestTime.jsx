import React from "react";
import { Container, Button } from "react-bootstrap";

const TestTime = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center h-100"
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
          <Button variant="dark" className="mb-2 w-100">
            Start Test
          </Button>
          <br />
          <Button variant="outline-warning" className="w-100 mb-2">
            Light
          </Button>{" "}
        </div>
      </div>
    </Container>
  );
};

export default TestTime;
