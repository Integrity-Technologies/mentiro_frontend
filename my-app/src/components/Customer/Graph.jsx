import React, { useState } from "react";
import { FaRegHandshake } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import CandidateGraph from "./Candidategraph";

import ResultCard from "./ResultCard";
import Assessmentgraph from "./Assessmentgraph";
import CandidateCard from "./CandidateCard";
import { useNavigate } from "react-router-dom";

const DualGraphs = () => {
  const { t } = useTranslation();
  const [showResult, setShowResult] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showCandidate, setShowCandidate] = useState(false);
  const navigate = useNavigate();

  

  const goToResultMenu = () => {
    setShowResult(true);
    navigate("/customer-dashboard/test-result");
  };

  const goToAssessmentMenu = () => {
    setShowAssessment(true);
    navigate("/customer-dashboard/assessments");
  };

  const goToCandidateMenu = () => {
    setShowCandidate(true);
    navigate("/customer-dashboard/candidates-profile");
  };

  const handleRowClick = (candidate, assessment, test) => {
    // Handle the row click logic here, for example:
    // console.log("Candidate:", candidate);
    // console.log("Assessment:", assessment);
    // console.log("Test:", test);
    setShowResult(true); // Navigate to Candidate Results menu
    navigate("/customer-dashboard/test-result");
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-left text-black">
        <FaRegHandshake className="inline-block mr-2" />
        <span className="inline-block animate-pulse">
          {t("graphView.Welcome")}
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={goToCandidateMenu}
          className="rounded-lg p-0 flex flex-col justify-center items-center cursor-pointer"
        >
          <CandidateCard />
        </div>
        <div
          onClick={goToAssessmentMenu}
          className="rounded-lg p-0 flex flex-col justify-center items-center cursor-pointer"
        >
          <Assessmentgraph />
        </div>
        <div
          onClick={goToResultMenu}
          className="rounded-lg p-0 flex flex-col justify-center items-center cursor-pointer"
        >
          <ResultCard />
        </div>
      </div>
      <div className="rounded-lg p-0 mt-0 flex flex-col ">
        <h2 className="text-2xl font-bold mb-2 flex  text-gray-800 mt-5">
          <span className="font-bold">
            {t("graphView.candidatesDetails")}
          </span>
        </h2>
        <div className="mb-4"></div>
        <CandidateGraph onRowClick={handleRowClick} />
      </div>
    </div>
  );
};

export default DualGraphs;
