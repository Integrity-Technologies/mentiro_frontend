import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InviteCandidate from "./InviteCandidate";
import {
  addAssessmentWithTests,
  getAllAssessments,
} from "../../actions/AssesmentAction";
import { useDispatch } from "react-redux";
import TestSelection from "./TestSelection";
import Category from "../Admin/Categories"; // Import the Category component if needed

const Preview = () => {
  const dispatch = useDispatch();
  const [showInviteCandidate, setShowInviteCandidate] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showTestSelection, setShowTestSelection] = useState(false);
  const [assessmentData, setAssessmentData] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    const assessmentName = localStorage.getItem("assessments");
    const activeCompany = JSON.parse(localStorage.getItem("activeCompany"));
    const selectedTests = JSON.parse(localStorage.getItem("selectedTests"));

    if (assessmentName && activeCompany && selectedTests) {
      const companyName = activeCompany.name;
      const data = {
        assessmentName,
        companyName,
        tests: selectedTests,
      };
      setAssessmentData(data);
    }
  }, []);

  useEffect(() => {
    if (
      assessmentData &&
      assessmentData.tests &&
      !assessmentData.assessmentTime
    ) {
      let totalAssessmentTime = 0;
      const updatedTests = assessmentData.tests.map((test) => {
        const { test_name, test_difficulty, category } = test;
        if (!test_difficulty) return test;
        const totalQuestions = Object.values(test_difficulty).reduce(
          (acc, val) => acc + val,
          0
        );
        const testTime = totalQuestions * 1; // 1 minute per question
        totalAssessmentTime += testTime;
        return {
          test_name,
          testTime,
          test_difficulty,
          category, // Include category in the test object
          
        };
      });

      setAssessmentData((prevState) => ({
        ...prevState,
        tests: updatedTests,
        assessmentTime: totalAssessmentTime,
      }));
    }
  }, [assessmentData]);

  const handleSubmitButtonClick = async () => {
    try {
      if (!assessmentData) {
        throw new Error("Assessment data is not available.");
      }
  
       await dispatch(
        addAssessmentWithTests({
          assessment_name: assessmentData.assessmentName,
          company_name: assessmentData.companyName,
          tests: assessmentData.tests,
        })
      );
  
  
      // Update local state to trigger the next step in UI
      setShowPreview(false);
      setShowInviteCandidate(true);
  
      // Dispatch action to get all assessments (if needed)
      await dispatch(getAllAssessments());
    } catch (error) {
      console.error(error);
      // Handle error, show error messages, etc.
    }
  };
  


  const handleBackButtonClick = () => {
    setShowInviteCandidate(false);
    setShowPreview(true);
    setShowTestSelection(false);
  };

  const handleTestSelectionButtonClick = () => {
    setShowTestSelection(true);
    setShowPreview(false);
  };

  return (
    <>
      {/* {successAlert && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success:</strong>
          <span className="block sm:inline ml-2">
            Assessment created successfully.
          </span>
        </div>
      )}
      {errorAlert && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">
            Failed to create assessment. Please try again.
          </span>
        </div>
      )} */}
      {showTestSelection && (
        <TestSelection handleBackButtonClick={handleBackButtonClick} />
      )}
      {!showTestSelection && showPreview && assessmentData && (
        <div className="container mx-auto">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-3xl font-semibold text-center mb-8">
              Assessment Preview
            </h2>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="text-xl font-semibold mb-4">
                  Assessment Details
                </Card.Title>
                <div className="grid grid-cols-2 gap-4">
  <div>
    <p className="text-sm font-semibold">Assessment Name:</p>
    <p className="text-lg">{assessmentData.assessmentName}</p>
  </div>
  <div>
    <p className="text-sm font-semibold">Category:</p>
    <div>
      {assessmentData.tests.map((test, index) => (
        <span
          key={index}
          className="inline-block px-3 py-1 mr-2 bg-blue-500 text-white text-sm font-semibold rounded-full"
        >
          {test.category}
        </span>
      ))}
    </div>
  </div>

  <div>
    <p className="text-sm font-semibold">Total Tests:</p>
    <p className="text-lg">{assessmentData.tests.length}</p>
  </div>
  <div>
    <p className="text-sm font-semibold">Assessment Time:</p>
    <div className="flex items-center">
      <span className="mr-2">{assessmentData.assessmentTime}</span>
      <span className="inline-block px-2 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
        mins <i className="far fa-clock ml-1"></i>
      </span>
    </div>
  </div>
</div>
              </Card.Body>
            </Card>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Selected Tests</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">
                      Test Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentData.tests.map((test, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="border border-gray-300 px-4 py-2">
                        {test.test_name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {test.testTime} mins{" "}
                        <i className="far fa-clock ml-1"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                variant="success"
                size="lg"
                onClick={handleSubmitButtonClick}
              >
                Submit
              </Button>
              <Button
                variant="outline-primary"
                size="lg"
                onClick={handleTestSelectionButtonClick}
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
