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
  const tests = [
    { testName: "Coding Test", duration: 10 },
    { testName: "SEO Quiz", duration: 10 },
    { testName: "Programming", duration: 10 },
    { testName: "English", duration: 10 },

    // Add more tests here
  ];

  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Assessment Preview</h2>

        {/* Card for assessment details */}
        <Card className="mb-4">
  <Card.Body>
    <Card.Title className="text-xl font-semibold mb-4">Assessment Details</Card.Title>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-semibold">Assessment Name:</p>
        <p className="text-lg">{assessmentName}</p>
      </div>
      <div>
        <p className="text-sm font-semibold">Category:</p>
        <p className="text-lg">{categoryName}</p>
      </div>
      <div>
        <p className="text-sm font-semibold">Total Tests:</p>
        <p className="text-lg">4</p>
      </div>
      <div>
        <p className="text-sm font-semibold">Assessment Time:</p>
        <p className="text-lg">40 mins <i className="far fa-clock ml-1"></i></p>
      </div>
    </div>
  </Card.Body>
</Card>


        {/* Table for selected tests */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Selected Tests</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Test Name</th>
                <th className="border border-gray-300 px-4 py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{test.testName}</td>
                  <td className="border border-gray-300 px-4 py-2">{test.duration} mins <i className="far fa-clock ml-1"></i></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmitButtonClick}
          >
            Submit
          </Button>
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
    </div>
  );
};

export default Preview;
