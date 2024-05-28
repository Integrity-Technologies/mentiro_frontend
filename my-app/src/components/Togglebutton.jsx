import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Import the icon

const LanguageToggleButton = ({ isLanguageButton, onLanguageChange }) => {
  const { i18n } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const currentLanguage = i18n.language;

  const dispatch = useDispatch();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    onLanguageChange(lng);
  };

  const handleLogout = () => {
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
  <div className=" top-0">
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onClick={() =>
          changeLanguage(currentLanguage === "en" ? "ar" : "en")
        }
      />
      <div className=" w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {currentLanguage === "en" ? "English" : "Arabic"}
      </span>
    </label>
  </div>
)}

      <div className="fixed-bottom ml-md-5">
        {showAlert && (
          <div className="w-25 p-4 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md">
            Logout successful.
          </div>
        )}
        <div className="ml-5 w-25">
          <a
            href="#"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-bold flex no-underline"
          >
            <FaSignOutAlt className="mr-2" /> {/* Icon with margin */}
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default LanguageToggleButton;
