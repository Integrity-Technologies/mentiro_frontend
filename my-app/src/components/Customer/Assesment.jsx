import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getToken } from "../../actions/authActions";
import { getAllAssessments, getAlljobLocation, getAlljobRole, getAllworkArrangement } from "../../actions/AssesmentAction";
import BallProgressBar from "./BallProgressbar";
import TestSelection from "./TestSelection";
import Preview from "./Preview";
import Select from "react-select";

const Assessment = () => {
  const { t } = useTranslation();
  const [assessmentName, setAssessmentName] = useState("");
  const [jobRole, setJobRole] = useState(null);
  const [workArrangement, setWorkArrangement] = useState(null);
  const [jobLocation, setJobLocation] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTestSelection, setShowTestSelection] = useState(false);

  const totalSteps = 3;
  const labels = [
    t("Assessments.assessmentDetails"),
    t("Assessments.chooseTests"),
    t("Assessments.preview"),
  ];

  const assessments = useSelector((state) => state.assessment.assessments || []);
  const workArrangements = useSelector((state) => state.assessment.workArrangements || []);
  const jobLocations = useSelector((state) => state.assessment.jobLocations || []);
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
        const response = await fetch(`${process.env.REACT_APP_API_URL}/company/myCompanies`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.length === 0) {
          console.error("Please create a company first.");
        }
      } catch (error) {
        console.error("Error checking company existence:", error);
      }
    };

    checkCompanyExists();
  }, [token]);

  const handleAddAssessment = () => {
    let error = false;
    if (!assessmentName.trim()) {
      console.error("Assessment name is required.");
      error = true;
    }
    if (!jobRole) {
      console.error("Job role is required.");
      error = true;
    }
    if (!workArrangement) {
      console.error("Work arrangement is required.");
      error = true;
    }
    if (!jobLocation) {
      console.error("Job location is required.");
      error = true;
    }

    if (error) return;

    const assessmentData = {
      assessment_name: assessmentName.trim(),
      jobRole: jobRole.value,
      workArrangement: workArrangement.value,
      jobLocation: jobLocation.value,
    };

    localStorage.setItem("assessmentData", JSON.stringify(assessmentData));
    setAssessmentName("");
    setCurrentStep(1);
    setShowTestSelection(true);
  };

  const handleBackButtonClick = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
    if (currentStep === 1) {
      setShowTestSelection(false); // Only when navigating back from Test Selection
    }
  };

  const goToNextStep = () => {
    setCurrentStep((prevStep) => (prevStep < totalSteps - 1 ? prevStep + 1 : prevStep));
  };
  

  const jobRoleOptions = jobRoles.map((role) => ({ value: role.name, label: role.name }));
  const workArrangementOptions = workArrangements.map((arrangement) => ({ value: arrangement.name, label: arrangement.name }));
  const jobLocationOptions = jobLocations.map((location) => ({ value: location.name, label: location.name }));

  return (
    <div className="container bg-blue-100 h-screen mx-auto p-4 flex flex-col font-roboto">
      <h2 className="text-2xl font-medium mb-4">{t("Assessments.createAssessment")}</h2>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <BallProgressBar steps={totalSteps} currentStep={currentStep} labels={labels} />

{currentStep === 1 ? (
  <TestSelection
    handleBackButtonClick={handleBackButtonClick}
    goToNextStep={goToNextStep}
  />
) : currentStep === 2 ? (
  <Preview
    handleBackButton={handleBackButtonClick}
    goToNextStep={goToNextStep}
  />
) : (
          <div>
            <h3 className="text-xl font-medium mb-4 mt-4">{t("Assessments.assessmentDetails")}</h3>
            <div className="grid grid-cols-2 gap-4 mt-0">
              <div className="relative">
                <label htmlFor="formAssessmentName" className="mb-1 text-sm font-medium text-gray-700">
                  {t("Assessments.name")}
                </label>
                <input
                  type="text"
                  id="formAssessmentName"
                  className="block w-full px-3 py-2 text-sm text-gray-900 bg-white rounded border-1 border-gray-400"
                  value={assessmentName}
                  onChange={(e) => setAssessmentName(e.target.value)}
                />
              </div>

              <div className="relative">
                <label htmlFor="formJobRole" className="mb-1 text-sm font-medium text-gray-700">
                  {t("Assessments.jobrole")}
                </label>
                <Select
                  id="formJobRole"
                  value={jobRole}
                  onChange={(selectedOption) => setJobRole(selectedOption)}
                  options={jobRoleOptions}
                />
              </div>

              <div className="relative">
                <label htmlFor="formWorkArrangement" className="mb-1 text-sm font-medium text-gray-700">
                  {t("Assessments.workarrangement")}
                </label>
                <Select
                  id="formWorkArrangement"
                  value={workArrangement}
                  onChange={(selectedOption) => setWorkArrangement(selectedOption)}
                  options={workArrangementOptions}
                />
              </div>

              <div className="relative">
                <label htmlFor="formJobLocation" className="mb-1 text-sm font-medium text-gray-700">
                  {t("Assessments.joblocation")}
                </label>
                <Select
                  id="formJobLocation"
                  value={jobLocation}
                  onChange={(selectedOption) => setJobLocation(selectedOption)}
                  options={jobLocationOptions}
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleAddAssessment}
                className="bg-blue-900 text-white font-bold w-24 py-2 px-4 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;
