import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import TestTime from "./TestTime";

const YourTests = () => {
  const [showTime, setShowTime] = useState(false);

  const handleSubmitButtonClick = () => {
    setShowTime(true);
  };

  return (
    <div>
      {showTime ? (
        <TestTime />
      ) : (
        <div>
          <Container className="text-center" style={{ height: "100vh" }}>
            <h1 className="mb-4">Your Tests</h1>

            {/* First test */}
            <div className="mb-3">
              <h4 className="d-inline-block mr-3 mb-0">SEO Basics:</h4>
              <Button
                variant="dark"
                className="w-25"
                onClick={handleSubmitButtonClick}
              >
                Start
              </Button>
            </div>

            {/* Second test */}
            <div className="mb-3">
              <h4 className="d-inline-block mr-3 mb-0">SEO Basics:</h4>
              <Button variant="dark" className="w-25">
                Start
              </Button>
            </div>

            {/* Third test */}
            <div className="mb-3">
              <h4 className="d-inline-block mr-3 mb-0">SEO Basics:</h4>
              <Button variant="dark" className="w-25">
                Start
              </Button>
            </div>

            {/* Fourth test */}
            <div className="mb-3">
              <h4 className="d-inline-block mr-3 mb-0">SEO Basics:</h4>
              <Button variant="dark" className="w-25">
                Start
              </Button>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default YourTests;
