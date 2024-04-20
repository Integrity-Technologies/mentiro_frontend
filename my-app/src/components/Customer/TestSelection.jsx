import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Question from './Question';

const TestSelection = ({ handleBackButtonClick }) => {
  const handleNextButtonClick = () => {
    Question(false)
  };
  
  const categoryName = "SEO"; // Category name
  const testDifficultyLevel = "Medium"; // Test difficulty level

  return (
    <div>
      <h2 className="text-center mb-4">Test Selection</h2>
      <Row className="justify-content-center align-items-center">
        <Col md={4} className="mb-3 ml-md-15">
          <Card style={{ width: '18rem' }}>
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
        <Col md={4}>
          <Card style={{ width: '18rem' }} className="mb-3">
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
        <Col md={4}>
          <Card style={{ width: '18rem' }} className="mb-3">
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
      </Row>

      <div className="text-center mt-4">
        <Button variant="outline-primary" size="lg" onClick={handleBackButtonClick}>
          Back
        </Button>{' '}
        <Button variant="outline-success" size="lg" onClick={handleNextButtonClick}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default TestSelection;
