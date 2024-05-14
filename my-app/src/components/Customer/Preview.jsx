import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InviteCandidate from "./InviteCandidate";
import { addAssessmentWithTests, getAllAssessments } from "../../actions/AssesmentAction";
import { useDispatch } from "react-redux";

const Preview = ({ handleBackButtonClick }) => {
  const dispatch = useDispatch();
  const [showInviteCandidate, setShowInviteCandidate] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const handleSubmitButtonClick = async () => {
    setShowPreview(false);
    setShowInviteCandidate(true);

    const assessmentName = localStorage.getItem('assessments');
    const companyName = JSON.parse(localStorage.getItem('activeCompany')).name;
    const selectedTests = JSON.parse(localStorage.getItem('selectedTests'));

    await dispatch(addAssessmentWithTests({
      assessment_name: assessmentName,
      company_name: companyName,
      tests: selectedTests
    }));

    await dispatch(getAllAssessments());
  };

  const assessmentName = "Sample Assessment";
  const categoryName = "SEO";
  const tests = [
    { testName: "Coding Test", duration: 10 },
    { testName: "SEO Quiz", duration: 10 },
    { testName: "Programming", duration: 10 },
    { testName: "English", duration: 10 },
  ];

  return (
    <>
      {showPreview && (
        <div className="container mx-auto">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-3xl font-semibold text-center mb-8">Assessment Preview</h2>

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
                    <p className="text-lg">{tests.length}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Assessment Time:</p>
                    <p className="text-lg">40 mins <i className="far fa-clock ml-1"></i></p>
                  </div>
                </div>
              </Card.Body>
            </Card>

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
          </div>
        </div>
      )}

      {showInviteCandidate && <InviteCandidate />}
    </>
  );
};

export default Preview;