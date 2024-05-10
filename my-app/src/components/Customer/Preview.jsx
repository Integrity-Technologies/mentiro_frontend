import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InviteCandidate from "./InviteCandidate"; // Import the InviteCandidate component

const Preview = ({ handleBackButtonClick }) => {
  // State to manage visibility of the invite candidate component
  const [showInviteCandidate, setShowInviteCandidate] = useState(false);

  // Function to handle submit button click
  const handleSubmitButtonClick = () => {
    setShowInviteCandidate(true);
  };

  // Data to be displayed in the preview
  const assessmentName = "Sample Assessment"; // Replace with actual assessment name
  const categoryName = "SEO"; // Replace with actual category name
  const testDifficultyLevel = "Medium"; // Replace with actual difficulty level

  // Array of sample questions (replace with actual questions data)
  const questions = [
    {
      question: "What is SEO?",
      options: [
        "Search Optimization",
        "Search Engine",
        "Search Engine Optimization",
        "Search Engine",
      ],
    },
    // Add more questions here
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Assessment Preview</h2>

        {/* Card for assessment details */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title className="text-xl font-semibold">Assessment Details</Card.Title>
            <Card.Text>
              <p><strong>Assessment Name:</strong> {assessmentName}</p>
              <p><strong>Category:</strong> {categoryName}</p>
              <p><strong>Difficulty Level:</strong> {testDifficultyLevel}</p>
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Display questions */}
        <h3 className="text-2xl font-semibold mb-4">Questions:</h3>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg">
              Question {index + 1}: {question.question}
            </p>
            <ul className="list-disc pl-6">
              {question.options.map((option, idx) => (
                <li key={idx} className="text-lg">{option}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Submit Button */}
        <div className="text-center mt-8">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmitButtonClick}
            className="w-full md:w-auto"
          >
            Submit
          </Button>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline-primary"
            size="lg"
            onClick={handleBackButtonClick}
            className="w-full md:w-auto"
          >
            Back
          </Button>
        </div>

        {/* Invite Candidate Component */}
        {showInviteCandidate && <InviteCandidate />}
      </div>
    </div>
  );
};

export default Preview;
