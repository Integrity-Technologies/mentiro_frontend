import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { getToken } from "../../actions/authActions";
import TestSelection from "./TestSelection";
import { FaClipboardList } from "react-icons/fa";
import BallProgressBar from "./BallProgressbar";
import { getAllAssessments } from "../../actions/AssesmentAction";
import countries from "../../data/countries";

const Assessment = () => {
  const [assessmentName, setAssessmentName] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobRoleError, setJobRoleError] = useState("");
  const [workArrangement, setWorkArrangement] = useState("");
  const [workArrangementError, setWorkArrangementError] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobLocationError, setJobLocationError] = useState("");
  const [showTestSelection, setShowTestSelection] = useState(false);
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(0);

    const labels = ["Assessment Details", "Choose Tests", "Preview"];

  const assessments = useSelector((state) => state.assessment.assessments || []);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAssessments());
  }, [dispatch]);

  const handleAddAssessment = () => {
    let error = false;
    if (assessmentName.trim() === "") {
      setCompanyError("Assessment name is required.");
      error = true;
    } else {
      setCompanyError("");
    }

    if (jobRole.trim() === "") {
      setJobRoleError("Job role is required.");
      error = true;
    } else {
      setJobRoleError("");
    }

    if (workArrangement.trim() === "") {
      setWorkArrangementError("Work arrangement is required.");
      error = true;
    } else {
      setWorkArrangementError("");
    }

    if (jobLocation.trim() === "") {
      setJobLocationError("Job location is required.");
      error = true;
    } else {
      setJobLocationError("");
    }

    if (error) {
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
    <BallProgressBar
      steps={totalSteps}
      currentStep={currentStep}
      labels={labels}
    />
    {showTestSelection ? (
      <TestSelection
        assessments={assessments}
        handleBackButtonClick={handleBackButtonClick}
        goToNextStep={goToNextStep}
      />
    ) : (
      <div className="">
        <div className="flex items-center mb-4 mt-5">
          <FaClipboardList className="mr-2" size={22} />
          <h2 className="text-xl font-bold">Create New Assessment</h2>
        </div>
        <hr className="mb-6 border-gray-400" />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <label
              htmlFor="formAssessmentName"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Assessment Name
            </label>
            <input
              type="text"
              id="formAssessmentName"
              placeholder="Enter assessment name"
              className={`block px-3 py-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                companyError ? "border-red-500" : ""
              }`}
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
            />
            {companyError && (
              <p className="mt-2 text-sm text-red-600">{companyError}</p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="formJobRole"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Job Role
            </label>
            <input
              type="text"
              id="formJobRole"
              placeholder="Enter job role"
              className={`block px-3 py-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                jobRoleError ? "border-red-500" : ""
              }`}
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
            {jobRoleError && (
              <p className="mt-2 text-sm text-red-600">{jobRoleError}</p>
            )}
          </div>
        </div>
        <div className="relative mb-4">
          <label
            htmlFor="formWorkArrangement"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Work Arrangement
          </label>
          <select
            id="formWorkArrangement"
            className={`block px-3 py-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              workArrangementError ? "border-red-500" : ""
            }`}
            value={workArrangement}
            onChange={(e) => setWorkArrangement(e.target.value)}
          >
            <option value="">Work Arrangement...</option>
            <option value="online">Online</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
          {workArrangementError && (
            <p className="mt-2 text-sm text-red-600">{workArrangementError}</p>
          )}
        </div>

        <div className="relative mb-4">
          <label
            htmlFor="formJobLocation"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Job Location
          </label>
          <select
            id="formJobLocation"
            className={`block px-3 py-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              jobLocationError ? "border-red-500" : ""
            }`}
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
          {jobLocationError && (
            <p className="mt-2 text-sm text-red-600">{jobLocationError}</p>
          )}
        </div>
        <Button
          onClick={handleAddAssessment}
          className="bg-black  hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          {showTestSelection ? "Create Assessment" : "Create Assessment"}
        </Button>
      </div>
    )}
  </>
</div>
  );
};

export default Assessment;
