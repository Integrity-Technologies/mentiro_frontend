import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FiPenTool } from "react-icons/fi";
import { FaClock } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  addAssessmentWithTests,
  getAllAssessments,
} from "../../actions/AssesmentAction";
import TestSelection from "./TestSelection";
import InviteCandidate from "./InviteCandidate";
import { useTranslation } from "react-i18next";

const Preview = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showInviteCandidate, setShowInviteCandidate] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showTestSelection, setShowTestSelection] = useState(false);
  const [assessmentData, setAssessmentData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const assessmentData = JSON.parse(localStorage.getItem("assessmentData"));
    const CompanyName = (localStorage.getItem("CompanyName"));
    const selectedTests = JSON.parse(localStorage.getItem("selectedTests"));
    const assessmentName = assessmentData.assessment_name;
    const job_role = assessmentData.jobRole;
    const work_arrangement = assessmentData.workArrangement;
    const job_location = assessmentData.jobLocation;

    if (assessmentData && CompanyName && selectedTests) {
      const company_name = CompanyName;
      const data = {
        assessmentName,
        job_role,
        work_arrangement,
        job_location,
        company_name,
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
          category,
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
          job_role: assessmentData.job_role,
          work_arrangement: assessmentData.work_arrangement,
          job_location: assessmentData.job_location,
          company_name: assessmentData.company_name,
          tests: assessmentData.tests,
        })
      );

      console.log(assessmentData);
      setShowPreview(false);
      setShowInviteCandidate(true);

      await dispatch(getAllAssessments());
    } catch (error) {
      console.error(error);
    }
  };


  const handleBackButton = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1)); // Decrease current step by 1
    setProgress((prevProgress) => Math.max(0, prevProgress - 1)); // Decrease progress by 1
    setShowTestSelection(true); // Show the test selection component
    setShowPreview(false); // Hide the preview component
  };
  
  // Log the updated currentStep whenever it changes
 
  
  
  

  return (
    <>
      {showTestSelection && (
        <TestSelection currentStep={currentStep} handleBackButton={handleBackButton} />
      )}
      {!showTestSelection && showPreview && assessmentData && (
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h3 className="text-2xl font-medium">
              {t("PreviewAssessment.title")}
            </h3>
            {/* <div className="flex mt-4 sm:mt-0 space-x-4">
              <button
                onClick={handleBackButton}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded transition-colors duration-300"
              >
                {t("PreviewAssessment.back")}
              </button>
              <button
                onClick={handleSubmitButtonClick}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-12 rounded transition-colors duration-300"
              >
                {t("PreviewAssessment.submit")}
              </button>
            </div> */}
          </div>

          <div className="flex flex-col p-0 mt-12 transition duration-300">
            <h3 className="text-sm font-medium mb-1 text-gray-700">
              {t("PreviewAssessment.name")}
            </h3>
            <p className="text-2xl font-medium text-gray-900">
              {assessmentData.assessmentName}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 p-10">
            <div className="flex flex-col items-center">
              <FiPenTool className="text-2xl font-semibold text-blue-900 mb-0" />
              <div className="flex flex-col item-center text-center p-2 transition duration-300">
                <h3 className="text-lg font-medium text-gray-600">
                  {t("PreviewAssessment.jobrole")}
                </h3>
                <p className="text-md font-medium whitespace-nowrap text-gray-500 mt-0 text-center">
                  {assessmentData.job_role}
                </p>
              </div>
            </div>

            <div className="hidden md:block border-l-2 border-gray-300 h-28 mx-8"></div>

            <div className="flex flex-col items-center">
              <BsBuildingsFill className="text-2xl text-blue-900 mb-0" />
              <div className="flex flex-col text-center p-2 transition duration-300">
                <h3 className="text-lg font-medium whitespace-nowrap text-gray-600">
                  {t("PreviewAssessment.workarrangement")}
                </h3>
                <p className="text-md font-medium text-gray-500 mt-0 text-center">
                  {assessmentData.work_arrangement}
                </p>
              </div>
            </div>

            <div className="hidden md:block border-l-2 border-gray-300 h-28 mx-8"></div>

            <div className="flex flex-col items-center">
              <FaLocationDot className="text-2xl text-blue-900 mb-0" />
              <div className="flex flex-col text-center p-2 transition duration-300">
                <h3 className="text-lg font-medium whitespace-nowrap text-gray-600">
                  {t("PreviewAssessment.joblocation")}
                </h3>
                <p className="text-md font-medium text-gray-500 mt-0 text-center">
                  {assessmentData.job_location}
                </p>
              </div>
            </div>

            <div className="hidden md:block border-l-2 border-gray-300 h-28 mx-8"></div>

            <div className="flex flex-col items-center">
              <FaClock className="text-2xl text-blue-900 mb-0" />
              <div className="flex flex-col text-center p-2 transition duration-300">
                <h3 className="text-lg font-medium whitespace-nowrap text-gray-600">
                  {t("PreviewAssessment.time")}
                </h3>
                <p className="text-md font-bold text-gray-500 mt-0 text-center">
                  {assessmentData.assessmentTime}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 mt-8">
            <h3 className="text-sm font-medium mb-4 flex items-center">
              {t("PreviewAssessment.selectedtests")}
            </h3>
            <p className="text-lg font-medium text-gray-900 -mt-3">
              {assessmentData.tests.length} Test Selected
            </p>
            <table className="min-w-full divide-y divide-gray-200 shadow-md mt-5">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    {t("PreviewAssessment.testname")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    {t("PreviewAssessment.duration")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Question Split
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assessmentData.tests.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center px-4 py-4 border bg-yellow-100 text-yellow-700"
                    >
                      No tests selected
                    </td>
                  </tr>
                ) : (
                  assessmentData.tests.map((test, index) => (
                    <tr
                      key={index}
                      className="hover:bg-blue-100 cursor-pointer transition duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {test.test_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {test.testTime} mins
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-10 h-5 bg-green-600 text-xs text-white">
                            {test.test_difficulty.easy}
                          </div>
                          <div className="flex items-center justify-center w-10 h-5 bg-yellow-500 text-xs text-white">
                            {test.test_difficulty.medium}
                          </div>
                          <div className="flex items-center justify-center w-10 h-5 bg-red-500 text-xs text-white">
                            {test.test_difficulty.hard}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-5 bottom-0 left-0 right-0  p-3  flex justify-between">
              <button
                onClick={handleBackButton}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border-1 border-blue-900 rounded transition-colors duration-300"
              >
                {t("PreviewAssessment.back")}
              </button>
              <button
                onClick={handleSubmitButtonClick}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-12 rounded transition-colors duration-300"
              >
                {t("PreviewAssessment.submit")}
              </button>
            </div>
        </div>
      )}
      {showInviteCandidate && <InviteCandidate />}
    </>
  );
};

export default Preview;
