import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Assesment from "./Assesment";
import DualLineGraph from "./Graph";
import CompanyProfile from "./CompanyProfile";
import CandidateProfile from "./CandidatesProfile";
import ViewTestResult from "./ViewTestResult";
import LanguageToggleButton from "../Togglebutton";
import PreviewExistingAssessment from "./PreviewExistingAssesment";
const logoImage = "/assets/icon.jpg";

const Customer = ({isLanguageButton} ) => {
  const { t, i18n } = useTranslation();

  const [activeLink, setActiveLink] = useState("/Graph"); // Default active link to the graph
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (lng) => {
    setSelectedLanguage(lng);
  };

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const sections = {
    "/Graph": <DualLineGraph />,
    "/CompanyProfile": <CompanyProfile />,
    "/Assessments": <Assesment />,
    "/CandidatesProfile": (
      <CandidateProfile
        language={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
    ),
    "/TestResult": <ViewTestResult />,
    "/Preview-assesment": <PreviewExistingAssessment />
  };

  // Define customer menu options
  const customerMenuOptions = [
    { label: "Dashboard", link: "/Graph" },
    { label: "CompanyProfile", link: "/CompanyProfile" },
    { label: "Assessment", link: "/Assessments" },
    { label: "CandidatesProfile", link: "/CandidatesProfile" },
    { label: "TestResult", link: "/TestResult" },
  ];

  return (
    <div className="flex">
      <div className="w-1/5 bg-white shadow h-screen">
        <div className="text-center mb-3">
          <img
            src={logoImage}
            alt="Logo"
            className="rounded-full w-32 mt-5 mx-auto"
          />
        </div>
        <nav className="mt-10">
          {customerMenuOptions.map((option) => (
            <button
              key={option.link}
              className={`block px-20 py-2 mr-20 ${
                activeLink === option.link ? "bg-teal-600 text-white" : ""
              } mb-3`}
              onClick={() => handleClick(option.link)}
            >
              {option.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="w-4/5 bg-gray-100 p-10">{sections[activeLink]}</div>
      {/* Language Dropdown */}
      <div className="absolute top-0 right-0 mt-2 mr-5">
        <div className="relative">
          {/* <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedLanguage}{" "}
            <i
              className={`fas ${
                dropdownOpen ? "fa-chevron-up" : "fa-chevron-down"
              } ml-1`}
            ></i>
          </button> */}
          {/* {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-md">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleLanguageChange("English")}
              >
                English
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleLanguageChange("Arabic")}
              >
                Arabic
              </button>
            </div>
          )} */}
          <LanguageToggleButton onLanguageChange={handleLanguageChange} isLanguageButton={isLanguageButton}/>
        </div>
      </div>
    </div>
  );
};

export default Customer;
