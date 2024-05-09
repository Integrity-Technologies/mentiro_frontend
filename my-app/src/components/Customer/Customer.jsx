import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageToggleButton from "../Togglebutton";
import Assesment from "./Assesment";
import Graph from "./Graph";
import CompanyProfile from "./CompanyProfile";
const logoImage = "/assets/icon.jpg";

const Customer = () => {
  const { t, i18n } = useTranslation();

  const [activeLink, setActiveLink] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (lng) => {
    setSelectedLanguage(lng);
  };

  const handleClick = (link) => {
    setActiveLink(link);
  };

  const sections = {
    "/CompanyProfile": <CompanyProfile />,
    "/Assesments": <Assesment />,
  };

  // Define customer menu options
  const customerMenuOptions = [
    { label: "Company Profile", link: "/customer/option1" },
    { label: "Assessment", link: "/customer/option2" },
  ];

  return (
    <div className="flex">
      <div className="w-1/5 bg-white shadow h-screen">
        <div className="text-center mb-3">
          <img src={logoImage} alt="Logo" className="rounded-full w-32 mt-5 mx-auto" />
        </div>
        <nav className="mt-10">
  {Object.keys(sections).map((link) => (
    <button
      key={link}
      className={`block px-20 py-2 mr-20 ${
        activeLink.includes(link) ? "bg-teal-400 text-white" : ""
      } mb-3`}
      onClick={() => handleClick(link)}
    >
      {link === "/Assesments" ? "Assessment" : link.replace("/", "")}
    </button>
  ))}
</nav>

        <LanguageToggleButton onLanguageChange={handleLanguageChange} />
        <div className="flex justify-around mt-10">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            English
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            العربية
          </button>
        </div>
      </div>
      <div className="w-4/5 bg-gray-100 p-10">
        {sections[activeLink]}
      </div>
    </div>
  );
};

export default Customer;
