import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { getToken } from "../../actions/authActions";
import TestSelection from "./TestSelection";
import { FaClipboardList, FaEye, FaTrash } from "react-icons/fa";
import { MdAssessment } from "react-icons/md";

import {
  getAllAssessments,
  editAssessment,
  deleteAssessment,
} from "../../actions/AssesmentAction";

const Assessment = () => {
  const [assessmentName, setAssessmentName] = useState("");
  const [companyError, setCompanyError] = useState(""); // State for company error message
  const [nextButton, setNextButton] = useState(false);
  const [currentView, setCurrentView] = useState("list"); // State for tracking the current view
  const [showDeleteAlert, setShowDeleteAlert] = useState(false); // State for showing delete alert
  const [showTestSelection, setShowTestSelection] = useState(false);

  const assessments = useSelector(
    (state) => state.assessment.assessments || []
  );
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAssessments());
  }, [dispatch]);

  const handleAddAssessment = () => {
    if (assessmentName.trim() === "") {
      setCompanyError("Assessment name is required.");
      return;
    }

    const isDuplicate = assessments?.assessments?.some(
      (assessment) =>
        assessment.assessment_name.toLowerCase() ===
        assessmentName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setCompanyError("Assessment name already exists.");
      return;
    }

    const newAssessment = {
      id: Object.keys(assessments).length + 1,
      assessment_name: assessmentName.trim(),
    };
    localStorage.setItem("assessments", newAssessment.assessment_name);
    setNextButton(true);
    setAssessmentName("");
  };

  const handleNextButtonClick = () => {
    const activeCompany = JSON.parse(localStorage.getItem("activeCompany"));
    if (activeCompany && activeCompany.name) {
      setShowTestSelection(true);
      // Handle the next button functionality here
    } else {
      setCompanyError("Please create a company first.");
    }
  };

  const handleBackButtonClick = () => {
    setShowTestSelection(false);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen flex flex-col px-6 py-10 relative">
      <>
        {showTestSelection ? (
          <TestSelection
            assessments={assessments}
            handleBackButtonClick={handleBackButtonClick}
          />
        ) : (
          <div className="">
            <div className="flex items-center mb-4">
              <FaClipboardList className="mr-2" size={22} />
              <h2 className="text-xl font-bold">Create New Assessment</h2>
            </div>
            <hr className="mb-6 border-gray-400" />
            <div className="relative mb-4">
              <label htmlFor="formAssessmentName" className="text-lg block mb-1 text-sm font-medium text-gray-700">
                Assessment Name
              </label>
              <input
                type="text"
                id="formAssessmentName"
                placeholder=""
                className={`block px-2 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 ${companyError ? 'border-red-500' : ''}`}
                value={assessmentName}
                onChange={(e) => setAssessmentName(e.target.value)}
              />
              {companyError && (
                <p className="mt-2 text-sm text-red-600">{companyError}</p>
              )}
            </div>
            <Button
              onClick={handleAddAssessment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              Create Assessment
            </Button>
            {nextButton && (
              <div className="text-center mt-4">
                <button
                  onClick={handleNextButtonClick}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default Assessment;
