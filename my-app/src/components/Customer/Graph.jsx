import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import CircleGraph from "./CircleGraph";
import DonutGraph from "./DonutGraph";
import { useTranslation } from "react-i18next";

const DualGraphs = () => {
  const { t } = useTranslation();
  return (

    <div className="flex gap-5 h-screen bg-gray-100">
      <div className="bg-gray-100  flex flex-col items-center p-5 shadow-lg rounded-lg w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800 border-b-2 border-gray-200 pb-3">
          <FaUserCircle className="inline mr-2 text-primary" />
          {t("graphView.Candidate")}
        </h2>
        <DonutGraph />
      </div>
      <div className="bg-gray-100 flex flex-col items-center p-5 shadow-lg rounded-lg w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800 border-b-2 border-gray-200 pb-3">
          <AiOutlineBarChart className="inline mr-2 text-primary" />
          {t("graphView.Assessment")}
        </h2>
        <CircleGraph />
      </div>
    </div>
  );
};

export default DualGraphs;