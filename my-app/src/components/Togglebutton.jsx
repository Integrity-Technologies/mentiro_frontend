import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Import the icon

const LanguageToggleButton = ({
  isLanguageButton,
  onLanguageChange,
  isMenuCollapsed,
}) => {
  const { t, i18n } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const currentLanguage = i18n.language;

  const dispatch = useDispatch();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    onLanguageChange(lng);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all items from local storage
    dispatch(logout());
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate("/");
    }, 2000); // 2000 milliseconds = 2 seconds, adjust as needed
  };

  return (
    <div>
      {isLanguageButton && (
        <div className="sticky top-0 right-5 z-50 p-2">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onClick={() =>
                changeLanguage(currentLanguage === "en" ? "ar" : "en")
              }
            />
            <div className="sticky w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            {!isMenuCollapsed && (
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {currentLanguage === "en" ? "English" : "Arabic"}
              </span>
            )}
          </label>
        </div>
      )}

      <div className="fixed-bottom ml-md-5">
        {showAlert && (
          <div className="inline-block p-2 mb-2 ml-6 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md text-center">
            {t("toggleButton.logoutSuccess")}
          </div>
        )}
        <div className="flex ml-5 items-center mb-2">
          <a
            href="#"
            onClick={handleLogout}
            className={`flex items-center text-sm rounded hover:bg-gray-800 transition-colors no-underline ${
              isMenuCollapsed
                ? "bg-black text-white p-2"
                : "px-4 py-2 bg-black text-white hover:bg-gray-800"
            }`}
          >
            <FaSignOutAlt className={`${isMenuCollapsed ? "" : "ltr:mr-2 rtl:ml-2"}`} />
            {!isMenuCollapsed && t("toggleButton.Logout")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LanguageToggleButton;
