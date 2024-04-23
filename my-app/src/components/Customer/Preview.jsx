import React, { useState } from "react";
import Button from "react-bootstrap/Button";
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
    <div>
      {showInviteCandidate ? (
        <InviteCandidate handleBackButtonClick={handleBackButtonClick} />
      ) : (
        <div>
          <h2 className="text-center mb-4">Assessment Preview</h2>
          {/* Display assessment name and details */}
          <p>Assessment Name: {assessmentName}</p>
          <p>Category: {categoryName}</p>
          <p>Difficulty Level: {testDifficultyLevel}</p>

          {/* Display questions */}
          <h3>Questions:</h3>
          {questions.map((question, index) => (
            <div key={index}>
              <p>
                Question {index + 1}: {question.question}
              </p>
              <ul>
                {question.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Submit Button */}
          <div className="text-center mt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmitButtonClick}
            >
              Submit
            </Button>
          </div>

          {/* Back Button */}
          <div className="text-center mt-4">
            <Button
              variant="outline-primary"
              size="lg"
              onClick={handleBackButtonClick}
            >
              Back
            </Button>
          </div>

          {/* Invite Candidate Component */}
          {showInviteCandidate && <InviteCandidate />}
        </div>
      )}
    </div>
  );
};

export default Preview;
