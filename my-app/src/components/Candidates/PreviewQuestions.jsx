import React from 'react';
import { Button, Card } from 'react-bootstrap';

const PreviewPage = ({ attemptedCount, skippedCount, onSubmit, onReviewSkipped }) => {
  return (
    <Card className="p-6 shadow-lg rounded-lg mt-3 bg-white" style={{ width: '900px', overflowY: 'auto' }}>
      <h2 className="mb-4 text-center">Test Summary</h2>
      <div className="text-center mb-4">
        <p>Attempted Questions: {attemptedCount}</p>
        <p>Skipped Questions: {skippedCount}</p>
      </div>
      <div className="flex justify-around mt-4">
        <Button variant="secondary" onClick={onReviewSkipped}>
          Continue Test
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </Card>
  );
};

export default PreviewPage;
