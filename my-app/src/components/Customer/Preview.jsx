import React, { useState, useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md"; // Import clock icon
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
      {showTestSelection && (
        <TestSelection handleBackButtonClick={handleBackButtonClick} />
      )}
      {!showTestSelection && showPreview && assessmentData && (
        <div className="container mx-auto p-4 md:p-8">
          <div className="bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeIn">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
              <FaClipboardList className="mr-2" />
              <span>Assessment Preview</span>
            </h2>
            <div className="grid gap-4 mb-8 md:grid-cols-2">
              <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Assessment Name</h3>
                <p className="text-lg font-bold text-gray-900">{assessmentData.assessmentName}</p>
              </div>
              <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Category</h3>
                <div className="flex flex-wrap">
                  {assessmentData.tests.map((test, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 mr-2 mb-2 bg-green-500 text-white text-sm font-semibold rounded-full"
                    >
                      {test.category}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Tests</h3>
                <p className="text-lg font-bold text-gray-900">{assessmentData.tests.length}</p>
              </div>
              <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-3 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Assessment Time</h3>
                <div className="flex items-center">
                <span className="inline-block px-2 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full flex items-center">
                  <span className="text-lg font-bold text-gray-900 mr-2 text-white">{assessmentData.assessmentTime}</span>
                  
                    mins <MdAccessTime className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaClipboardList className="mr-2" />
                Selected Tests
              </h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Test Name</th>
                    <th className="border border-gray-300 px-4 py-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {assessmentData.tests.map((test, index) => (
                    <tr key={index} className="border-b border-gray-300 animate__animated animate__fadeInUp hover:bg-gray-100 cursor-pointer">
                      <td className="border border-gray-300 px-4 py-2">{test.test_name}</td>
                      <td className="border border-gray-300 px-4 py-2 flex items-center">
                        {test.testTime} mins <MdAccessTime className="ml-1" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                size="lg"
                onClick={handleSubmitButtonClick}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2 transition-colors duration-300"
              >
                Submit
              </button>
              <button
                size="lg"
                onClick={handleTestSelectionButtonClick}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded transition-colors duration-300"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
      {showInviteCandidate && <InviteCandidate />}
    </>
  );
};

export default Preview;
