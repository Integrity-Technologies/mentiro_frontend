import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../actions/authActions"; // Adjust the path as needed
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
    }, 2000); // 3000 milliseconds = 3 seconds, adjust as needed
  };

  return (
    <div>
      {isLanguageButton && (
        <>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onClick={() =>
                changeLanguage(currentLanguage === "en" ? "ar" : "en")
              }
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {currentLanguage === "en" ? "English" : "Arabic"}
            </span>
          </label>
        </>
      )}
      <div className="fixed-bottom ml-md-5">
        {showAlert && (
          <Alert variant="danger" className="w-25">
            Logout successful.
          </Alert>
        )}
        <Button onClick={handleLogout} variant="danger" className="ml-md-25">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LanguageToggleButton;