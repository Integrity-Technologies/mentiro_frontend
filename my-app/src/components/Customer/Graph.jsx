import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import CircleGraph from "./CircleGraph";
import DonutGraph from "./DonutGraph";
import { useTranslation } from "react-i18next";
import CandidateGraph from "./Candidategraph";
import BarGraph from "./CircleGraph";
import RadialBarGraph from "./CircleGraph";

const DualGraphs = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Welcome to Mentiro
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold  flex items-center text-gray-800">
            <FaUserCircle className="mr-2 text-primary" />
            {t("graphView.Candidate")}
          </h2>
          <DonutGraph />
        </div>
        <div className="bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold flex items-center text-gray-800">
            <AiOutlineBarChart className="mr-2 text-primary" />
            {t("graphView.Assessment")}
          </h2>
          <RadialBarGraph />
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
          <AiOutlineBarChart className="mr-2 text-primary" />
          {t("graphView.CandidatesDetails")}
        </h2>
        <CandidateGraph />
      </div>
    </div>
  );
};

export default DualGraphs;
