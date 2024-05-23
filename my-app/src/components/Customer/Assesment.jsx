import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { getToken } from "../../actions/authActions";
import TestSelection from "./TestSelection";
import { FaClipboardList } from "react-icons/fa";
import BallProgressBar from "./BallProgressbar";
import { getAllAssessments } from "../../actions/AssesmentAction";
import countries from "../../data/countries";

const Assessment = () => {
  const [assessmentName, setAssessmentName] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [currentView, setCurrentView] = useState("list");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [workArrangement, setWorkArrangement] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [showTestSelection, setShowTestSelection] = useState(false);
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(0);

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
    setAssessmentName("");
    setCurrentStep(1);

    const activeCompany = JSON.parse(localStorage.getItem("activeCompany"));
    if (activeCompany && activeCompany.name) {
      setShowTestSelection(true);
    } else {
      setCompanyError("Please create a company first.");
    }
  };

  const handleBackButtonClick = () => {
    setShowTestSelection(false);
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen flex flex-col px-6 py-10 relative">
      <>
        <BallProgressBar steps={totalSteps} currentStep={currentStep} />

        {showTestSelection ? (
          <TestSelection
            assessments={assessments}
            handleBackButtonClick={handleBackButtonClick}
            goToNextStep={goToNextStep} // Pass the goToNextStep function
          />
        ) : (
          <div className="">
            <div className="flex items-center mb-4">
              <FaClipboardList className="mr-2" size={22} />
              <h2 className="text-xl font-bold">Create New Assessment</h2>
            </div>
            <hr className="mb-6 border-gray-400" />
            <div className="relative mb-4">
              <label
                htmlFor="formAssessmentName"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Assessment Name
              </label>
              <input
                type="text"
                id="formAssessmentName"
                placeholder=""
                className={`block px-2 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 ${
                  companyError ? "border-red-500" : ""
                }`}
                value={assessmentName}
                onChange={(e) => setAssessmentName(e.target.value)}
              />
              {companyError && (
                <p className="mt-2 text-sm text-red-600">{companyError}</p>
              )}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="formJobRole"
                className="text-lg block mb-1 text-sm font-medium text-gray-700"
              >
                Job Role
              </label>
              <input
                type="text"
                id="formJobRole"
                className="block px-2 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="formWorkArrangement"
                className="text-lg block mb-1 text-sm font-medium text-gray-700"
              >
                Work Arrangement
              </label>
              <select
                id="formWorkArrangement"
                className="block px-2 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                value={workArrangement}
                onChange={(e) => setWorkArrangement(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="online">Online</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="formJobLocation"
                className="text-lg block mb-1 text-sm font-medium text-gray-700"
              >
                Job Location
              </label>
              <select
                id="formJobLocation"
                className="block px-2 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
              >
                <option value="">Select...</option>
                {countries.map((country, index) => (
                  <option key={index} value={country.country_name}>
                    {country.country_name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={handleAddAssessment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              {showTestSelection ? "Create Assessment" : "Create & Continue"}
            </Button>
          </div>

)}
</>
</div>
);
};

export default Assessment;