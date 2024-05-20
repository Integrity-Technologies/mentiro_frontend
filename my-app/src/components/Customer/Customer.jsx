import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Assesment from "./Assesment";
import DualLineGraph from "./Graph";
import CompanyProfile from "./CompanyProfile";
import CandidateProfile from "./CandidatesProfile";
import ViewTestResult from "./ViewTestResult";
import LanguageToggleButton from "../Togglebutton";
import PreviewExistingAssessment from "./PreviewExistingAssesment";
import { FaTachometerAlt, FaBuilding, FaClipboardList, FaUser, FaFileAlt } from "react-icons/fa";
const logoImage = "/assets/icon.jpg";

const Customer = ({ isLanguageButton }) => {
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
    { label: "Dashboard", link: "/Graph", icon: <FaTachometerAlt /> },
    { label: "Company Profile", link: "/CompanyProfile", icon: <FaBuilding /> },
    { label: "Assessment", link: "/Assessments", icon: <FaClipboardList /> },
    { label: "Candidate Profile", link: "/CandidatesProfile", icon: <FaUser /> },
    { label: "Test Result", link: "/TestResult", icon: <FaFileAlt /> },
  ];

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-white shadow h-full overflow-y-auto">
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
              className={`flex items-center px-4 md:px-20 py-2 mb-3 w-full text-left ${
                activeLink === option.link ? "shadow-lg shadow-green-300 bg-green-100" : ""
              } hover:bg-green-100 mb-3`}
              onClick={() => handleClick(option.link)}
            >
              <span className={`mr-3 ${activeLink === option.link ? "text-green-600" : "text-gray-600"}`}>
                {option.icon}
              </span>
              <span className={`${activeLink === option.link ? "text-green-600" : "text-gray-600"}`}>
                {t(option.label)}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="w-4/5 bg-gray-100 p-10 overflow-y-auto">
        {sections[activeLink]}
      </div>
      {/* Language Dropdown */}
      <div className="absolute top-0 right-0 mt-2 mr-5">
  
          <LanguageToggleButton 
            onLanguageChange={handleLanguageChange}
            isLanguageButton={isLanguageButton}
          />
      </div>
    </div>
  );
};

export default Customer;
