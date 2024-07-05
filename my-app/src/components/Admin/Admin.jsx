import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LanguageToggleButton from "../Togglebutton";
import Users from "./Users"; // Import the Users component
import Tests from "./Tests";
import Category from "./Categories";
import Candidates from "./Candidates";
import ViewTestResult from "./ViewTestResult";
import Company from "./Company";
import { NavLink } from "react-router-dom";
import Question from "./Question";
const logoImage = "/assets/icon.jpg";

const Dashboard = ({ isLanguageButton }) => {
  const { t, i18n } = useTranslation();

  const [activeLink, setActiveLink] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (lng) => {
    setSelectedLanguage(lng);
  };

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    // For example, clear user session and redirect to login page
    // sessionStorage.clear();
    // window.location.href = "/login";
  };

  const sections = {
    "/Users": (
      <Users
        language={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
    ),
    "/Questions": <Question />,
    "/Tests": (
      <Tests
        language={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
    ),
    "/Categories": <Category />,
    "/Candidates": <Candidates />,
    "/TestResult": <ViewTestResult />,
    "/Company": <Company />,
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-200 lg:w-64 border-r border-gray-300">
        <div className="p-4 text-center">
          <Image src={logoImage} alt="Logo" className="rounded-full w-20 h-20 mx-auto mb-4" />
        </div>
        <nav className="flex flex-col">
          {Object.keys(sections).map((link) => (
            <button
              key={link}
              onClick={() => handleClick(link)}
              className={`p-4 text-left hover:bg-gray-300 focus:bg-gray-300 ${
                activeLink === link ? "bg-gray-300" : ""
              }`}
            >
              {link === "/Users" ? t("users.title") : link.replace("/", "")}
            </button>
          ))}
          <NavLink
            to="/" // Redirect to login page or any other route for logout
            onClick={handleLogout}
            className="p-4 text-left hover:bg-gray-300 focus:bg-gray-300 mt-4"
          >
            Logout
          </NavLink>
        </nav>
        <div className="p-4 mt-auto">
          <LanguageToggleButton
            isLanguageButton={isLanguageButton}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4">
        {sections[activeLink]}
      </main>
    </div>
  );
};

export default Dashboard;
