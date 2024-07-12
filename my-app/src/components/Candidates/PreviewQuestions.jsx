import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Mentirobluelogo = "/assets/Mentirobluelogo.png"; // Logo


const PreviewPage = ({ totalQuestions, attemptedCount, skippedCount, onSubmit, onReviewSkipped }) => {
  const renderQuestionCount = (label, count) => (
    <div className="d-flex justify-content-between align-items-center border p-6 mb-3">
      <p className="mb-0">{label}</p>
      <p className="mb-0">{count}</p>
    </div>
  );

  return (
    <>
    <div className="flex flex-col items-center mt-4">
    <img src={Mentirobluelogo} alt="Mentiro Logo" className="mb-4" style={{ height: '90px' }} />
  </div>
    <Card className="p-4 shadow-lg rounded-lg mt-0 bg-white" style={{ width: '500px', overflowY: 'auto' }}>
      <h2 className="mb-4 text-center">Summary</h2>
      <div className="mb-4">
        {renderQuestionCount('Total Questions', totalQuestions)}
        {renderQuestionCount('Attempted Questions', attemptedCount)}
        {renderQuestionCount('Skipped Questions', skippedCount)}
      </div>
      <div className="d-flex justify-content-around mt-4 gap-4">
        <button className='border-2 border-blue-900 text-blue-900 w-50 h-10' onClick={onReviewSkipped}>
          Review Skipped Questions
        </button>
        <button className='bg-blue-900 text-white w-52 h-10' onClick={onSubmit}>
          Submit
        </button>
      </div>
    </Card>
    </>
  );
};

export default PreviewPage;
