import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Assesment from "./Assesment";
import DualLineGraph from "./Graph";
import CompanyProfile from "./CompanyProfile";
import CandidateProfile from "./CandidatesProfile";
import ViewTestResult from "./ViewTestResult";
import LanguageToggleButton from "../Togglebutton";
import PreviewExistingAssessment from "./PreviewExistingAssesment";
import {
  FaTachometerAlt,
  FaBuilding,
  FaClipboardList,
  FaUser,
  FaFileAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import ActiveAssessment from "./ActiveAssessment";
const logoImage = "/assets/icon.jpg";

const Customer = ({ isLanguageButton }) => {
  const { t, i18n } = useTranslation();

  const [activeLink, setActiveLink] = useState("/Graph"); // Default active link to the graph
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const handleLanguageChange = (lng) => {
    setSelectedLanguage(lng);
  };

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const toggleMenuCollapse = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const sections = {
    "/Graph": <DualLineGraph />,
    "/CompanyProfile": <CompanyProfile />,
    "/Assessments": <ActiveAssessment />,
    "/CandidatesProfile": (
      <CandidateProfile
        language={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
    ),
    "/TestResult": <ViewTestResult />,
    "/Preview-assesment": <PreviewExistingAssessment />,
  };

  // Define customer menu options
  const customerMenuOptions = [
    {
      label: `${t("CustomerDashboard.Dashboard")}`,
      link: "/Graph",
      icon: <FaTachometerAlt />,
    },
    {
      label: `${t("CustomerDashboard.companyProfile")}`,
      link: "/CompanyProfile",
      icon: <FaBuilding />,
    },
    {
      label: `${t("CustomerDashboard.Assessment")}`,
      link: "/Assessments",
      icon: <FaClipboardList />,
    },
    {
      label: `${t("CustomerDashboard.candidateProfile")}`,
      link: "/CandidatesProfile",
      icon: <FaUser />,
    },
    {
      label: `${t("CustomerDashboard.testResult")}`,
      link: "/TestResult",
      icon: <FaFileAlt />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-500 font-roboto">
      <div
        className={`flex flex-col ${
          isMenuCollapsed ? "w-20" : "w-1/6"
        } bg-white shadow h-full overflow-y-auto transition-width duration-300`}
      >
        <div className="flex justify-between items-center p-3 relative">
          <div className="text-center mb-3">
            {!isMenuCollapsed && (
              <img
                src={logoImage}
                alt="Logo"
                className="rounded-full w-32 mt-5 mx-auto"
              />
            )}
          </div>
          <button onClick={toggleMenuCollapse} className="p-2 absolute right-0">
            <div className="bg-gray-200 rounded-full absolute p-2 right-0 mt-3">
              {isMenuCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
            </div>
          </button>
        </div>
        <nav className="mt-10">
          {customerMenuOptions.map((option) => (
            <button
              key={option.link}
              className={`flex items-center px-4 md:px-20 py-2 mb-3 w-full text-left text-sm transition-colors
        ${
          activeLink === option.link
            ? "shadow-lg bg-blue-500 text-white shadow-green-300"
            : "hover:bg-blue-500 hover:text-white text-gray-600"
        }`}
              onClick={() => handleClick(option.link)}
            >
              <span
                className={`mr-3 ${
                  activeLink === option.link ? "text-white" : "hover:text-white"
                }`}
              >
                {option.icon}
              </span>
              {!isMenuCollapsed && (
                <span
                  className={`${
                    activeLink === option.link
                      ? "text-white"
                      : "hover:text-white"
                  }`}
                >
                  {t(option.label)}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="mt-3 ml-2">
          <LanguageToggleButton
            isMenuCollapsed={isMenuCollapsed}
            onLanguageChange={handleLanguageChange}
            isLanguageButton={isLanguageButton}
          />
        </div>
      </div>
      <div
        className={`transition-width duration-300 ${
          isMenuCollapsed ? "w-full" : "w-5/6"
        } bg-customGray p-10 overflow-y-auto`}
      >
        {sections[activeLink]}
      </div>
    </div>
  );
};

export default Customer;