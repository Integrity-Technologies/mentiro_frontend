import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import CircleGraph from "./CircleGraph";
import DonutGraph from "./DonutGraph";
import { useTranslation } from "react-i18next";
import CandidateGraph from "./Candidategraph";

const DualGraphs = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Welcome to Mentiro
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
        <div className="bg-white flex flex-col items-center p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 border-b-2 border-gray-200 pb-2">
            <FaUserCircle className="inline mr-2 text-primary" />
            {t("graphView.Candidate")}
          </h2>
          <DonutGraph />
        </div>
        <div className="bg-white flex flex-col items-center p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 border-b-2 border-gray-200 pb-2">
            <AiOutlineBarChart className="inline mr-2 text-primary" />
            {t("graphView.Assessment")}
          </h2>
          <CircleGraph />
        </div>
      </div>
      <div className="bg-white flex flex-col items-center p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 w-full md:w-2/3">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 border-b-2 border-gray-200 pb-2">
          <AiOutlineBarChart className="inline mr-2 text-primary" />
          {t("graphView.CandidatesDetails")}
        </h2>
        <CandidateGraph />
      </div>
    </div>
  );
};

export default DualGraphs;
