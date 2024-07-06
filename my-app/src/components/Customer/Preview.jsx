import React, { useState, useEffect } from "react";
import { FaClipboardList, FaUser } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
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
    const activeCompany = JSON.parse(localStorage.getItem("activeCompany"));
    const selectedTests = JSON.parse(localStorage.getItem("selectedTests"));
    const assessmentName = assessmentData.assessment_name;
    const job_role = assessmentData.jobRole;
    const work_arrangement = assessmentData.workArrangement;
    const job_location = assessmentData.jobLocation;

    if (assessmentData && activeCompany && selectedTests) {
      const companyName = activeCompany.name;
      const data = {
        assessmentName,
        job_role,
        work_arrangement,
        job_location,
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
          company_name: assessmentData.companyName,
          tests: assessmentData.tests,
        })
      );

      setShowPreview(false);
      setShowInviteCandidate(true);

      await dispatch(getAllAssessments());
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackButton = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1));
    setShowTestSelection(true);
    setShowPreview(false);
    setProgress((prevProgress) => prevProgress - 1);
  };

  return (
    <>
      {showTestSelection && (
        <TestSelection handleBackButton={handleBackButton} />
      )}
      {!showTestSelection && showPreview && assessmentData && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-medium">{t("PreviewAssessment.title")}</h3>
            <div className="flex mt-8 space-x-4">
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
            </div>
          </div>

          <div className="flex flex-col p-0 mt-12 transition duration-300 ">
              <h3 className="text-sm font-medium mb-1 text-gray-700">
                {t("PreviewAssessment.name")}
              </h3>
              <p className="text-2xl font-medium text-gray-900">
                {assessmentData.assessmentName}
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
           

            <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center">
                <FaClipboardList className="text-xl mb-2 mr-2" />
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  {t("PreviewAssessment.category")}
                </h3>
              </div>
              <div className="flex flex-wrap">
                {assessmentData.tests.map((test, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 mr-2 mb-2 bg-category-tag-bg text-black text-sm font-semibold rounded-full"
                  >
                    {test.category}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center">
                <FaClipboardList className="text-xl mb-2 mr-2" />
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  {t("PreviewAssessment.totaltests")}
                </h3>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {assessmentData.tests.length}
              </p>
            </div>

            <div className="flex flex-col bg-gray-50 rounded-lg shadow-md p-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center">
                <MdAccessTime className="text-xl mb-2 mr-2" />
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  {t("PreviewAssessment.time")}
                </h3>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 bg-category-tag-bg text-black text-sm font-semibold rounded-full flex items-center">
                  <MdAccessTime className="ml-1 mr-1" />
                  <span className="text-lg font-bold mr-2 text-black">
                    {assessmentData.assessmentTime} mins
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaClipboardList className="mr-2" />
              {t("PreviewAssessment.selectedtests")}
            </h3>
            <table className="min-w-full divide-y divide-gray-200 shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("PreviewAssessment.testname")}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {t("PreviewAssessment.duration")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assessmentData.tests.length === 0 ? (
                  <tr>
                    <td
                      colSpan="2"
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
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmitButtonClick}
              className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded transition-colors duration-300"
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
