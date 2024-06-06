import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { getToken } from "../../actions/authActions";
import TestSelection from "./TestSelection";
import { FaPlus, FaClipboardList, FaRegQuestionCircle } from "react-icons/fa";
import BallProgressBar from "./BallProgressbar";
import {
  getAllAssessments,
  getAlljobLocation,
  getAllworkArrangement,
} from "../../actions/AssesmentAction";
import countries from "../../data/countries";
import { useTranslation } from "react-i18next";

const Assessment = () => {
  const { t } = useTranslation();
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

  const token = useSelector(getToken);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAssessments());
    dispatch(getAllworkArrangement());
    dispatch(getAlljobLocation());
  }, [dispatch]);

  useEffect(() => {
    const checkCompanyExists = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/company/myCompanies",
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

    // const isDuplicate = assessments?.some(
    //   (assessment) =>
    //     assessment.assessment_name.toLowerCase() === assessmentName.trim().toLowerCase()
    // );

    // if (isDuplicate) {
    //   setCompanyError("Assessment name already exists.");
    //   return;
    // }

    // Create an object to store in local storage
    const assessmentData = {
      assessment_name: assessmentName.trim(),
      jobRole: jobRole.trim(),
      workArrangement: workArrangement.trim(),
      jobLocation: jobLocation.trim(),
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

  return (
    <>
      <div className="container bg-white  mx-auto p-4  min-h-screen flex flex-col px-6 py-10 relative">
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
            currentStep={currentStep} // Add this prop
          />
        ) : (
          <div className="">
            <div className="flex items-center mb-4 mt-5">
              <FaClipboardList className="mr-2 " size={22} />
              <h2 className="text-22px font-bold mt-2">
                {t("Assessments.title")}
              </h2>
            </div>
            <hr className="mb-6 border-gray-400" />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <label
                  htmlFor="formAssessmentName"
                  className=" mb-1 text-sm font-medium text-gray-700 flex items-center"
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{'test'}</Tooltip>}
                  >
                    <FaRegQuestionCircle className="mr-2 text-gray-400" />
                  </OverlayTrigger>
                  {t("Assessments.name")}
                </label>
                <input
                  type="text"
                  id="formAssessmentName"
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
                  className="flex mb-1 text-sm font-medium text-gray-700"
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{'jobroleTooltip'}</Tooltip>}
                  >
                    <FaRegQuestionCircle className="mr-2 text-gray-400" />
                  </OverlayTrigger>
                  {t("Assessments.jobrole")}
                </label>
                <input
                  type="text"
                  id="formJobRole"
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
              <div className="relative">
                <label
                  htmlFor="formWorkArrangement"
                  className="flex mb-1 text-sm font-medium text-gray-700"
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{t("Assessments.workArrangementTooltip")}</Tooltip>}
                  >
                    <FaRegQuestionCircle className="mr-2 text-gray-400" />
                  </OverlayTrigger>
                  {t("Assessments.WorkArrangement")}
                </label>
                <select
                  id="formWorkArrangement"
                  className={`block px-3 py-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    workArrangementError ? "border-red-500" : ""
                  }`}
                  value={workArrangement}
                  onChange={(e) => setWorkArrangement(e.target.value)}
                >
                  <option value="">Select...</option>
                  {workArrangements.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
                {workArrangementError && (
                  <p className="mt-2 text-sm text-red-600">
                    {workArrangementError}
                  </p>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="formJobLocation"
                  className="flex mb-1 text-sm font-medium text-gray-700"
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{t("Assessments.joblocationTooltip")}</Tooltip>}
                  >
                    <FaRegQuestionCircle className="mr-2 text-gray-400" />
                  </OverlayTrigger>
                  {t("Assessments.joblocation")}
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
                  {jobLocations.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
                {jobLocationError && (
                  <p className="mt-2 text-sm text-red-600">
                    {jobLocationError}
                  </p>
                )}
              </div>
            </div>
            <Button
              onClick={handleAddAssessment}
              className="bg-black hover:bg-black text-white justify-center font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 ml-auto"
            >
              <FaPlus className="inline-block mr-2" />
              <span className="inline-block">
                {showTestSelection
                  ? `${t("Assessments.createAssessment")}`
                  : `${t("Assessments.createAssessment")}`}
              </span>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Assessment;