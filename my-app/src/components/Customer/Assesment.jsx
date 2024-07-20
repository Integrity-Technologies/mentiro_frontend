import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { getToken } from "../../actions/authActions";
import TestSelection from "./TestSelection";
import { FaPlus, FaClipboardList, FaInfoCircle } from "react-icons/fa";
import BallProgressBar from "./BallProgressbar";
import {
  getAllAssessments,
  getAlljobLocation,
  getAlljobRole,
  getAllworkArrangement,
} from "../../actions/AssesmentAction";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const Assessment = () => {
  const { t } = useTranslation();
  const [assessmentName, setAssessmentName] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [jobRole, setJobRole] = useState(null);
  const [jobRoleError, setJobRoleError] = useState("");
  const [workArrangement, setWorkArrangement] = useState("");
  const [workArrangementError, setWorkArrangementError] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobLocationError, setJobLocationError] = useState("");

  const [showTestSelection, setShowTestSelection] = useState(false);
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState(0);

  const labels = [
    `${t("Assessments.assessmentDetails")}`,
    `${t("Assessments.chooseTests")}`,
    `${t("Assessments.preview")}`,
  ];

  const assessments = useSelector(
    (state) => state.assessment.assessments || []
  );
  const workArrangements = useSelector(
    (state) => state.assessment.workArrangements || []
  );
  const jobLocations = useSelector(
    (state) => state.assessment.jobLocations || []
  );

  const jobRoles = useSelector((state) => state.assessment.jobRoles || []);

  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAssessments());
    dispatch(getAllworkArrangement());
    dispatch(getAlljobLocation());
    dispatch(getAlljobRole());
  }, [dispatch]);

  useEffect(() => {
    const checkCompanyExists = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/company/myCompanies`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.length === 0) {
          setCompanyError("Please create a company first.");
        }
      } catch (error) {
        console.error("Error checking company existence:", error);
      }
    };

    checkCompanyExists();
  }, [token]);

  const handleAddAssessment = () => {
    let error = false;
    if (assessmentName.trim() === "") {
      setCompanyError("Assessment name is required.");
      error = true;
    } else {
      setCompanyError("");
    }

    if (!jobRole) {
      setJobRoleError("Job role is required.");
      error = true;
    } else {
      setJobRoleError("");
    }

    if (!workArrangement) {
      setWorkArrangementError("Work arrangement is required.");
      error = true;
    } else {
      setWorkArrangementError("");
    }

    if (!jobLocation) {
      setJobLocationError("Job location is required.");
      error = true;
    } else {
      setJobLocationError("");
    }

    if (error) {
      return;
    }

    // Create an object to store in local storage
    const assessmentData = {
      assessment_name: assessmentName.trim(),
      jobRole: jobRole.value,
      workArrangement: workArrangement.value,
      jobLocation: jobLocation.value,
    };

    // Stringify the object before saving to local storage
    localStorage.setItem("assessmentData", JSON.stringify(assessmentData));

    // Reset fields and move to the next step
    setAssessmentName("");
    setCurrentStep(1);

    if (!companyError) {
      setShowTestSelection(true);
    }
  };

  const handleBackButtonClick = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
    setShowTestSelection(false);
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
  };

  const jobRoleOptions = jobRoles.map((role) => ({
    value: role.name,
    label: role.name,
  }));

  const workArrangementOptions = workArrangements.map((arrangement) => ({
    value: arrangement.name,
    label: arrangement.name,
  }));

  const jobLocationOptions = jobLocations.map((location) => ({
    value: location.name,
    label: location.name,
  }));

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div className="container bg-blue-100 h-screen mx-auto p-4 flex flex-col font-roboto">
      <h2 className="text-2xl font-medium mb-4">{t("Assessments.createAssessment")}</h2>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <BallProgressBar steps={totalSteps} currentStep={currentStep} labels={labels} />

        {showTestSelection ? (
          <TestSelection
            assessments={assessments}
            handleBackButtonClick={handleBackButtonClick}
            goToNextStep={goToNextStep}
            currentStep={currentStep}
          />
        ) : (
          <div>
          <h3 className="text-xl font-medium mb-4 mt-4">
          {t("Assessments.assessmentDetails")}
        </h3>
        {/* <div className="flex justify-end mt-2">
          <button
            onClick={handleAddAssessment}
            className="bg-blue-900 border-blue-900 hover:bg-blue-800 text-white font-bold w-24 py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 ml-auto"
          >
            <span className="inline-block">
              {showTestSelection ? t("Assessments.createAssessment") : t("Assessments.next")}
            </span>
          </button>
        </div> */}
        
          <div className="grid grid-cols-2 gap-4 mt-0">
            <div className="relative">
              <label htmlFor="formAssessmentName" className="mb-1 text-sm font-medium text-gray-700 flex items-center">
                <FaInfoCircle className="mr-2" size={14} />
                {t("Assessments.name")}
              </label>
              <input
                type="text"
                id="formAssessmentName"
                className={`block w-full px-3 py-2 text-sm text-gray-900 bg-white rounded  border-1 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 ${companyError ? "border-red-500" : ""}`}
                value={assessmentName}
                onChange={(e) => setAssessmentName(e.target.value)}
              />
              {/* {companyError && <p className="mt-2 text-sm text-red-600">{companyError}</p>} */}
            </div>

            <div className="relative">
              <label htmlFor="formJobRole" className="flex mb-1 text-sm font-medium text-gray-700">
                <div className="group inline-block ml-2 mr-2">
                  <span className="relative z-10 block text-lg overflow-hidden">
                    <FaInfoCircle size={14} />
                  </span>
                  <div className="absolute hidden group-hover:block bg-gray-500 text-white text-xs rounded py-1 px-2 -mt-8 ml-6 w-40">
                    Specify the job role for which this assessment is intended.
                  </div>
                </div>
                {t("Assessments.jobrole")}
              </label>
              <Select
                id="formJobRole"
                className={`block w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-600`}
                value={jobRole}
                onChange={(selectedOption) => setJobRole(selectedOption)}
                options={jobRoleOptions}
                styles={customStyles}
                placeholder="Job Role"
              />
              {jobRoleError && (
                <p className="mt-2 text-sm text-red-600">{jobRoleError}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="formWorkArrangement" className="flex mb-1 text-sm font-medium text-gray-700">
                <div className="group inline-block ml-2 mr-2">
                  <span className="relative z-10 block text-lg">
                    <FaInfoCircle size={14} />
                  </span>
                  <div className="absolute hidden group-hover:block bg-gray-500 text-white text-xs rounded py-1 px-2 -mt-8 ml-6 w-40">
                    Indicate whether the role is remote, onsite, or hybrid.
                  </div>
                </div>
                {t("Assessments.workarrangement")}
              </label>
              <Select
                id="formWorkArrangement"
                className={`block w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-600`}
                value={workArrangement}
                onChange={(selectedOption) => setWorkArrangement(selectedOption)}
                options={workArrangementOptions}
                styles={customStyles}
                placeholder="Work Arrangement"
              />
              {workArrangementError && (
                <p className="mt-2 text-sm text-red-600">{workArrangementError}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="formJobLocation" className="flex mb-1 text-sm font-medium text-gray-700">
                <div className="group inline-block ml-2 mr-2">
                  <span className="relative z-10 block text-lg overflow-hidden">
                    <FaInfoCircle size={14} />
                  </span>
                  <div className="absolute hidden group-hover:block bg-gray-500 text-white text-xs rounded py-1 px-2 -mt-8 ml-6 w-40">
                    Select the location for the job.
                  </div>
                </div>
                {t("Assessments.joblocation")}
              </label>
              <Select
                id="formJobLocation"
                className={`block w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-600`}
                value={jobLocation}
                onChange={(selectedOption) => setJobLocation(selectedOption)}
                options={jobLocationOptions}
                styles={customStyles}
                placeholder="Job Location"
              />
              {jobLocationError && (
                <p className="mt-2 text-sm text-red-600">{jobLocationError}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-6">
          <button
            onClick={handleAddAssessment}
            className="bg-blue-900 border-blue-900 hover:bg-blue-800 text-white font-bold w-24 py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 ml-auto"
          >
            Next
          </button>
        </div>
          </div>
        )}
        
        {/* <div className="flex justify-end mt-4">
          <button
            onClick={handleAddAssessment}
            className="bg-blue-900 border-blue-900 hover:bg-blue-800 text-white font-bold w-24 py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 ml-auto"
          >
            <span className="inline-block">
              {showTestSelection ? t("Assessments.createAssessment") : t("Assessments.next")}
            </span>
          </button>
        </div> */}
        {/* Move these elements here */}
        
      </div>
    </div>
  );
};

export default Assessment;
