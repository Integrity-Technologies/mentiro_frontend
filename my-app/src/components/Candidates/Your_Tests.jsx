import React, { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
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
        <Container className="text-center" style={{ height: "100vh" }}>
          <h1 className="mb-4">Your Tests</h1>

          {/* First test */}
          <Card className="mb-3 p-3 w-50 mx-auto">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="mb-0">SEO Basics:</h4>
              <Button
                variant="dark"
                className="w-25"
                onClick={handleSubmitButtonClick}
              >
                Start
              </Button>
            </div>
          </Card>

          {/* Second test */}
          <Card className="mb-3 p-3 w-50 mx-auto">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="mb-0">Engish:</h4>
              <Button variant="dark" className="w-25">
                Start
              </Button>
            </div>
          </Card>

          {/* Third test */}
          <Card className="mb-3 p-3 w-50 mx-auto">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="mb-0">Html:</h4>
              <Button variant="dark" className="w-25">
                Start
              </Button>
            </div>
          </Card>

          {/* Fourth test */}
          <Card className="mb-3 p-3 w-50 mx-auto">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="mb-0">SEO Basics:</h4>
              <Button variant="dark" className="w-25">
                Start
              </Button>
            </div>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default YourTests;
