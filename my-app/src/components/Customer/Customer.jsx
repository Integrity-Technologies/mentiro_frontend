import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, Outlet } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import { IoBarChartOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import {
  
  FaBuilding,
  
  FaBars,
} from "react-icons/fa";
import LanguageToggleButton from "../Togglebutton";

const logo = "/assets/logo.png";

const Customer = ({ isLanguageButton }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const handleLanguageChange = (lng) => {
    setSelectedLanguage(lng);
  };

  const toggleMenuCollapse = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const customerMenuOptions = [
    {
      label: `${t("CustomerDashboard.Dashboard")}`,
      link: "graph",
      icon: <IoHomeOutline />      ,
    },
    {
      label: `${t("CustomerDashboard.companyProfile")}`,
      link: "company-profile",
      icon: <FaBuilding />,
    },
    {
      label: `${t("CustomerDashboard.Assessment")}`,
      link: "assessments",
      icon: <FaListCheck />      ,
    },
    {
      label: `${t("CustomerDashboard.candidateProfile")}`,
      link: "candidates-profile",
      icon: <LuUser />      ,
    },
    {
      label: `${t("CustomerDashboard.testResult")}`,
      link: "test-result",
      icon: <IoBarChartOutline />      ,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-500 font-roboto">
      <div
        className={`flex flex-col ${
          isMenuCollapsed ? "w-20" : "w-1/6"
        } bg-customGray shadow h-full text-white overflow-y-auto transition-width duration-300`}
      >
        <div className="flex justify-between items-center p-3 relative">
          <div className="text-center mb-3">
            {!isMenuCollapsed && (
              <img
                src={logo}
                alt="Logo"
                className="rounded-full w-32 mt-5 mx-auto"
              />
            )}
          </div>
          <button onClick={toggleMenuCollapse} className="p-2 absolute right-0">
            <div className=" rounded-full absolute p-2 right-0 mt-0">
              <FaBars />
            </div>
          </button>
        </div>
        <nav className="mt-10">
          {customerMenuOptions.map((option) => (
            <Link
              to={option.link}
              key={option.link}
              style={{
                textDecoration: "none", // Remove underline decoration
                listStyle: "none", // Remove list-style decoration
                outline: "none", // Remove outline on focus
              }}
            >
              <button
                className={`flex items-center px-4 md:px-20 py-2 text-white mb-3 w-full text-left text-sm transition-colors
                  ${
                    location.pathname.includes(option.link)
                      ? "shadow-lg bg-blue-500 text-white shadow-green-300"
                      : "hover:bg-blue-500 hover:text-white text-gray-600"
                  }`}
                style={{
                  textDecoration: "none", // Remove underline decoration
                  listStyle: "none", // Remove list-style decoration
                  outline: "none", // Remove outline on focus
                }}
              >
                <span
                  className={`mr-3 ${
                    location.pathname.includes(option.link)
                      ? "text-white"
                      : "hover:text-white"
                  }`}
                >
                  {option.icon}
                </span>
                {!isMenuCollapsed && (
                  <span
                    className={`${
                      location.pathname.includes(option.link)
                        ? "text-white"
                        : "hover:text-white"
                    }`}
                  >
                    {t(option.label)}
                  </span>
                )}
              </button>
            </Link>
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
        } bg-blue-100 p-10 overflow-y-auto`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Customer;
