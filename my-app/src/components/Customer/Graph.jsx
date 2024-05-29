import React from "react";
import { FaUserCircle, FaRegHandshake } from "react-icons/fa";
import { AiOutlineBarChart, AiOutlineLineChart } from "react-icons/ai";
import DonutGraph from "./DonutGraph";
import { useTranslation } from "react-i18next";
import CandidateGraph from "./Candidategraph";
import RadialBarGraph from "./CircleGraph";
// import CircleGraph from "./CircleGraph";
// import BarGraph from "./CircleGraph";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DualGraphs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle click event
  const navigateToCandidatesMenu = () => {
    navigate("/CandidatesProfile"); // Navigate to candidates menu page
  };

  return (
    <div className="container bg-gray-100 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-left text-black">
        <FaRegHandshake className="inline-block mr-2" />
        <span className="inline-block animate-pulse">Welcome to Mentiro</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-center items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          onClick={navigateToCandidatesMenu} // Add click event here
        >
          <h2 className="text-xl font-bold flex items-center text-gray-800">
            <FaUserCircle className="mr-2 text-primary" />
            <span className="font-bold underline">
              {t("graphView.Candidate")}
            </span>
          </h2>
          <DonutGraph />
        </div>
        <div className="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-center items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <h2 className="text-xl font-bold flex items-center text-gray-800">
            <AiOutlineLineChart className="mr-2 text-primary" />{" "}
            <span className="font-bold underline">
              {t("graphView.Assessment")}
            </span>
          </h2>
          <RadialBarGraph />
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg shadow-md p-6 mt-8 flex flex-col justify-center items-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
          <AiOutlineBarChart className="mr-2 text-primary" />
          <span className="font-bold underline">
            {t("graphView.candidatesDetails")}
          </span>
        </h2>
        <CandidateGraph />
      </div>
    </div>
  );
};

export default DualGraphs;