import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Your_Tests from "./Your_Tests";

const Candidate = () => {
  const [showTests, setShowTests] = useState(false);

  const handleSubmitButtonClick = () => {
    setShowTests(true);
  };
  return (
    <div>
      {showTests ? (
        <Your_Tests />
      ) : (
        <div>
          <Container
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Form className="p-4 border border-1" style={{ width: "500px" }}>
              <h1 className="text-center mb-4">Candidate Registration</h1>

              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name" />
              </Form.Group>

              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your last name" />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Button
                variant="dark"
                onClick={handleSubmitButtonClick}
                className="w-100"
              >
                Get Started
              </Button>
            </Form>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Candidate;
