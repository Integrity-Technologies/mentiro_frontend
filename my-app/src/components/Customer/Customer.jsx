import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, Outlet } from "react-router-dom";
import { IoHomeSharp  } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import { IoBarChart } from "react-icons/io5";
import { FaUser  } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
// import LanguageToggleButton from "../Togglebutton";
import Navbar from "../NavbarComp"; // Import the Navbar component

const logo = "https://res.cloudinary.com/dbkxdbmfy/image/upload/v1721924634/Logo_ree8gd.png";

const Customer = ({ isLanguageButton }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  // const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  // const handleLanguageChange = (lng) => {
  //   setSelectedLanguage(lng);
  // };

  const toggleMenuCollapse = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const customerMenuOptions = [
    {
      label: `${t("CustomerDashboard.Dashboard")}`,
      link: "graph",
      icon: <IoHomeSharp  />,
    },
    {
      label: `${t("CustomerDashboard.Assessment")}`,
      link: "assessments",
      icon: <FaListCheck />,
    },
    {
      label: `${t("CustomerDashboard.candidateProfile")}`,
      link: "candidates-profile",
      icon: <FaUser />,
    },
    {
      label: `${t("CustomerDashboard.testResult")}`,
      link: "test-result",
      icon: <IoBarChart />,
    },
  ];

  return (
    <div className="flex h-screen font-roboto">
      <div
        className={`flex flex-col ${
          isMenuCollapsed ? "w-20" : "w-full sm:w-1/3 md:w-1/5"
        } bg-customGray shadow h-full text-white overflow-y-auto transition-width duration-300`}
      >
        <div className="flex justify-between items-center p-3 relative">
          <div className="text-center mb-3">
            {!isMenuCollapsed && (
              <img
                src={logo}
                alt="Logo"
                className="rounded-full w-16 sm:w-24 md:w-32 mt-5 mx-auto"
              />
            )}
          </div>
          <button onClick={toggleMenuCollapse} className="p-2 absolute right-0">
            <div className="rounded-full absolute p-2 right-0 mt-0">
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
                textDecoration: "none",
                listStyle: "none",
                outline: "none",
              }}
            >
              <button
                className={`flex items-center px-4 md:px-8 lg:px-10 py-2 text-white mb-3 w-full text-left text-sm transition-colors
                  ${
                    location.pathname.includes(option.link)
                      ? "shadow-lg bg-blue-500 text-white shadow-green-300"
                      : "hover:bg-blue-500 hover:text-white text-gray-600"
                  }`}
              >
                <span className="mr-3">{option.icon}</span>
                {!isMenuCollapsed && (
                  <span>{t(option.label)}</span>
                )}
              </button>
            </Link>
          ))}
        </nav>
        {/* <div className="mt-3 ml-2">
          <LanguageToggleButton
            isMenuCollapsed={isMenuCollapsed}
            onLanguageChange={handleLanguageChange}
            isLanguageButton={isLanguageButton}
          />
        </div> */}
      </div>
      <div className="flex flex-col w-full">
        <Navbar /> {/* Include the Navbar component here */}
        <div className="flex-grow overflow-y-auto">
          <div
            className={`transition-width duration-300 ${
              isMenuCollapsed ? "w-full" : "w-full"
            } bg-blue-100 p-0`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
