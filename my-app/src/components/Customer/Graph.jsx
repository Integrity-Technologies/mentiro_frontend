import React, { useState } from "react";
import { FaUserCircle, FaRegHandshake } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import DonutGraph from "./DonutGraph";
import { useTranslation } from "react-i18next";
import CandidateGraph from "./Candidategraph";
import CandidateCard from "./CandidateCard";
import CircleGraph from "./CircleGraph";
import ViewTestResult from "./ViewTestResult";
import CandidateProfile from "./CandidatesProfile";
import ActiveAssessment from "./ActiveAssessment";

const DualGraphs = () => {
  const { t } = useTranslation();
  const [showResult, setShowResult] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showCandidate, setShowCandidate] = useState(false);

  const goToResultMenu = () => {
    setShowResult(true);
  };

  const goToAssessmentMenu = () => {
    setShowAssessment(true);
  };

  const goToCandidateMenu = () => {
    setShowCandidate(true);
  };

  const handleRowClick = (candidate, assessment, test) => {
    // Handle the row click logic here, for example:
    console.log("Candidate:", candidate);
    console.log("Assessment:", assessment);
    console.log("Test:", test);
    setShowResult(true); // Navigate to Candidate Results menu
  };

  if (showResult) {
    return <ViewTestResult />;
  }
  if (showAssessment) {
    return <ActiveAssessment />;
  }
  if (showCandidate) {
    return <CandidateProfile />;
  }

  return (
    <div className="container bg-white mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-left text-black">
        <FaRegHandshake className="inline-block mr-2" />
        <span className="inline-block animate-pulse">
          {t("graphView.Welcome")}
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          onClick={goToCandidateMenu}
          className="rounded-lg p-0 flex flex-col justify-center items-center"
        >
          {/* <h2 className="text-xl font-bold flex items-center text-center text-black">
            <FaUserCircle className="mr-2" />
            <span className="font-bold underline">
              {t("graphView.Candidate")}
            </span>
          </h2> */}
          <DonutGraph />
        </div>
        <div
          onClick={goToAssessmentMenu}
          className="rounded-lg p-0 flex flex-col justify-center items-center"
        >
          {/* <h2 className="text-xl font-bold flex items-center text-center text-gray-800">
            <AiOutlineLineChart className="mr-2" />
            <span className="font-bold underline">
              {t("graphView.Assessment")}
            </span>
          </h2> */}
          <CircleGraph />
        </div>
        <div
          onClick={goToResultMenu}
          className="rounded-lg p-0 flex flex-col justify-center items-center"
        >
          {/* <h2 className="text-xl font-bold flex items-center text-center text-black">
            <AiOutlineBarChart className="mr-2" />
            <span className="font-bold underline">Results</span>
          </h2> */}
          <CandidateCard />
        </div>
      </div>
      <div className="rounded-lg p-0 mt-0 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4 flex items-center text-center text-gray-800 mt-10">
          <AiOutlineBarChart className="mr-2" />
          <span className="font-bold underline">
            {t("graphView.candidatesDetails")}
          </span>
        </h2>
        <div className="mb-4"></div> {/* Add this line for additional space */}
        <CandidateGraph onRowClick={handleRowClick} />
        {/* <button
          onClick={goToResultMenu}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-black text-white hover:bg-blue-600"
        >
          {t("graphView.gotoResultMenu")}
        </button> */}
      </div>
    </div>
  );
};

export default DualGraphs;
