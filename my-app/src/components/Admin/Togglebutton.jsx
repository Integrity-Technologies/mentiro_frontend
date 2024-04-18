import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggleButton = ({ onLanguageChange }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    onLanguageChange(lng);
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("ar")}>العربية</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LanguageToggleButton;
