import React, { useState } from "react";
import { FaUserCircle, FaRegHandshake } from "react-icons/fa";
import { AiOutlineBarChart, AiOutlineLineChart } from "react-icons/ai";
import DonutGraph from "./DonutGraph";
import { useTranslation } from "react-i18next";
import CandidateGraph from "./Candidategraph";
import RadialBarGraph from "./CircleGraph";
import ViewTestResult from "./ViewTestResult";
import Assessment from "./Assesment";
import CandidateProfile from "./CandidatesProfile";
import ActiveAssessment from "./ActiveAssessment";

const DualGraphs = () => {
  const { t } = useTranslation();
  const [showResult, setShowResult] = useState(false); // State to control rendering of ViewTestResult
  const [showAssessment, setShowAssessment] = useState(false);
  const [showCandidate, setShowCandidate] = useState(false);

  // Function to handle click event for showing test results
  const goToResultMenu = () => {
    setShowResult(true); // Set showResult to true to render ViewTestResult
  };

  const goToAssessmentMenu = () => {
    setShowAssessment(true); // Set showResult to true to render ViewTestResult
  };
  const goToCandidateMenu = () => {
    setShowCandidate(true); // Set showResult to true to render ViewTestResult
  };

  // If showResult is true, render ViewTestResult component
  if (showResult) {
    return <ViewTestResult />;
  }
  if (showAssessment) {
    return <ActiveAssessment />;
  }
  if (showCandidate) {
    return <CandidateProfile />;
  }

  // Render DualGraphs component when showResult is false
  return (
    <div className="container bg-white  mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-left text-black">
        <FaRegHandshake className="inline-block mr-2" />
        <span className="inline-block animate-pulse">
          {t("graphView.Welcome")}
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          onClick={goToCandidateMenu}
          className="rounded-lg p-0 flex flex-col justify-center items-center"
        >
          <h2 className="text-xl font-bold flex items-center text-center text-black">
            <FaUserCircle className="mr-2 " />
            <span className="font-bold underline">
              {t("graphView.Candidate")}
            </span>
          </h2>
          <DonutGraph />
        </div>
        <div
          onClick={goToAssessmentMenu}
          className="rounded-lg p-0 flex flex-col justify-center items-center"
        >
          <h2 className="text-xl font-bold flex items-center text-center text-gray-800">
            <AiOutlineLineChart className="mr-2" />{" "}
            <span className="font-bold underline">
              {t("graphView.Assessment")}
            </span>
          </h2>
          <RadialBarGraph />
        </div>
      </div>
      <div className="rounded-lg p-0 mt-0 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-0 flex items-center text-center text-gray-800">
          <AiOutlineBarChart className="mr-2" />
          <span className="font-bold underline">
            {t("graphView.candidatesDetails")}
          </span>
        </h2>
        <CandidateGraph />
        <button
          onClick={goToResultMenu}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-black text-white hover:bg-blue-600"
        >
          {t("graphView.gotoResultMenu")}
        </button>
      </div>
    </div>
  );
};

export default DualGraphs;
